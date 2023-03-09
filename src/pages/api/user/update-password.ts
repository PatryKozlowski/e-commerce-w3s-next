import type { NextApiRequest, NextApiResponse } from 'next'
import { compare, hash } from 'bcrypt'
import prisma from '@/lib/utils/prisma'
import { getSession } from 'next-auth/react'

const updatePasswordHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized', status: res.statusCode })
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'HTTP method not valid (only PATCH)', status: res.statusCode })
  }

  const { password, repeatPassword } = req.body

  const saltRounds = 12

  const userId = session.user?.id as string

  const isValidUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (isValidUser?.id !== userId) {
    return res.status(404).json({ message: 'Invalid user id', status: res.statusCode })
  }

  if (!password) {
    return res.status(404).json({ message: 'You must specify a password', status: res.statusCode })
  }

  if (!repeatPassword) {
    return res.status(404).json({ message: 'You must specify a password', status: res.statusCode })
  }

  if (password !== repeatPassword) {
    return res.status(404).json({ message: 'Passwords not match', status: res.statusCode })
  }

  if (password.length < 8 || repeatPassword.length < 8) {
    return res.status(404).json({ message: 'Password must be longer than 8 characters', status: res.statusCode })
  }

  try {
    const oldUserPassword = isValidUser?.password as string

    const compareHashedPassword = await compare(password, oldUserPassword)

    if (compareHashedPassword) {
      return res.status(404).json({ message: 'The password must be different from the previous', status: res.statusCode })
    }

    const hashedNewPassword = await hash(password, saltRounds)

    const isChangedPassword = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedNewPassword
      }
    })

    if (isChangedPassword) {
      return res.status(200).json({ message: 'The password has been changed successfully', status: res.statusCode })
    } else {
      return res.status(500).json({ message: 'During changed password error occured', status: res.statusCode })
    }
  } catch (error) {
    return res.status(404).json({ message: 'Invalid chnage password token', status: res.statusCode })
  }
}

export default updatePasswordHandler
