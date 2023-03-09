import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { transporter } from '@/lib/utils/nodemailer'
import prisma from '@/lib/utils/prisma'

interface Payload {
  id: string
  email: string
}

const forgotPasswordHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)', status: res.statusCode })
  }

  const { email } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found', status: res.statusCode })
  }

  const { id, password } = user

  const JWT_SECRET = process.env.JWT_SECRET as string
  const secret = `${JWT_SECRET}${password as string}`

  const payload: Payload = {
    id,
    email
  }

  const token = jwt.sign(payload, secret, { expiresIn: '5m' })

  const resetPasswordURL = `${process.env.NEXT_PUBLIC_API_URL as string}/auth/forgot-password/${id}/${token}`

  const mailData = {
    from: process.env.EMAIL_USER_SERVICE as string,
    to: email,
    subject: 'Password Reset Link - E-commerce W3School',
    text: 'Dear user,\n\nPlease click the link below to reset your password If you did not request a password reset, please ignore this email.\n\nBest regards,\nThe E-commerce Team',
    html: `<p>Dear user,</p><p>Please click the link below to reset your password:</p><p><a href="${resetPasswordURL}">Password Reset Link</a></p><p>If you did not request a password reset, please ignore this email.</p><p>Best regards,<br>The E-commerce Team</p>`
  }

  try {
    await transporter.sendMail(mailData)
    return res.status(200).json({ message: 'Password reset link has been sent to your email', status: res.statusCode })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error occurred during sending email', status: res.statusCode })
  }
}

export default forgotPasswordHandler
