import prisma from '@/lib/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import jwt from 'jsonwebtoken'
import { transporter } from '@/lib/utils/nodemailer'
import { hash } from 'bcrypt'

interface Payload {
  id: string
  email: string
}

const sendDeletePinHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const saltRounds = 12
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized', status: res.statusCode })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)', status: res.statusCode })
  }

  const email = session?.user?.email as string
  const userId = session?.user?.id as string

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found', status: res.statusCode })
  }

  const generatePin = Math.floor(1000 + Math.random() * 9000)
  const pin = String(generatePin)
  const splitPin = pin.split('')

  const JWT_SECRET = process.env.JWT_SECRET as string
  const secret = `${JWT_SECRET}${pin}`

  const payload: Payload = {
    id: userId,
    email
  }

  const token = jwt.sign(payload, secret, { expiresIn: '5m' })

  const hashedPin = await hash(pin, saltRounds)

  try {
    await prisma.user.upsert({
      where: {
        id: userId
      },
      create: {
        deleteToken: token,
        deletePin: hashedPin
      },
      update: {
        deleteToken: token,
        deletePin: hashedPin
      }
    })

    const mailData = {
      from: process.env.EMAIL_USER_SERVICE as string,
      to: email,
      subject: 'PIN for Account Deletion - E-commerce W3School',
      text: 'Dear user,\n\nAs per your request, we are providing you with the PIN required to delete your account. Please do not share this PIN with anyone else, as it is unique to your account and necessary for the deletion process.\n\nYour PIN is below.\n\nTo delete your account, please visit our website and enter the above PIN when prompted. If you encounter any issues, please feel free to contact our customer support team for assistance.\n\nThank you for using our service. We hope to see you again in the future.\n\nBest regards,\n\nYour E-commerce W3School team',
      html: `<p>Dear user,</p><p>Delete account PIN:</p><span>${splitPin[0]}</span><span>${splitPin[1]}</span><span>${splitPin[2]}</span><span>${splitPin[3]}</span><p>If you did not request a delete account, please ignore this email.</p><p>Best regards,<br>The E-commerce Team</p>`
    }

    try {
      await transporter.sendMail(mailData)
      return res.status(200).json({ message: 'PIN has been sent to your email', status: res.statusCode })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error occurred during sending email', status: res.statusCode })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }
    return res.status(400).json({ message: 'Something went wrong', status: res.statusCode })
  }
}

export default sendDeletePinHandler
