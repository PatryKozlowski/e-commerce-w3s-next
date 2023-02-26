import prisma from '@/lib/utils/prisma'
import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

const saltRounds = 12

const signUpHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)', status: res.statusCode })
  }

  const { email, password, repeatPassword } = req.body

  if (!email || !password || !repeatPassword) {
    return res.status(404).json({ message: 'Please fill in all fields', status: res.statusCode })
  }

  if (password.length < 8 || repeatPassword.length < 8) {
    return res.status(404).json({ message: 'Password must be at least 8 characters long', status: res.statusCode })
  }

  if (password !== repeatPassword) {
    return res.status(404).json({ message: 'Passwords do not match', status: res.statusCode })
  }

  try {
    const isUser = await prisma.user.findUnique({ where: { email } })

    if (isUser) {
      return res.status(404).json({ message: 'User already exists', status: res.statusCode })
    }

    const hashedPassword = await hash(password, saltRounds)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    const account = await prisma.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: user.id
      }
    })

    if (user && account) {
      return res.status(200).json({ message: 'You have successfully registered', status: res.statusCode })
    } else {
      return res.status(400).json({ message: 'Unable to link account to created user profile', status: res.statusCode })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return res.status(400).json({ message: 'Something went wrong, please try again later', status: res.statusCode })
  }
}

export default signUpHandler
