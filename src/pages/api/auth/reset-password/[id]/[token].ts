import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import prisma from '@/lib/utils/prisma'

const resetPasswordHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'HTTP method not valid (only PATCH)' })
  }

  const { id, token } = req.query
  const { password, repeatPassword } = req.body

  const saltRounds = 12

  const userId = id as string

  const isValidUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (isValidUser?.id !== userId) {
    return res.status(404).json({ message: 'Invalid user id', status: 404 })
  }

  if (!password) {
    return res.status(404).json({ message: 'You must specify a password', status: 404 })
  }

  if (!repeatPassword) {
    return res.status(404).json({ message: 'You must specify a password', status: 404 })
  }

  if (password.length < 8 || repeatPassword.length < 8) {
    return res.status(404).json({ message: 'Password must be longer than 8 characters', status: 404 })
  }

  const JWT_SECRET = process.env.JWT_SECRET as string

  const queryToken = token as string
  const secret = `${String(JWT_SECRET)}${String(isValidUser?.password)}`

  try {
    jwt.verify(queryToken, secret)

    const oldUserPassword = isValidUser?.password as string

    const compareHashedPassword = await compare(password, oldUserPassword)

    if (compareHashedPassword) {
      return res.status(404).json({ message: 'The password must be different from the previous', status: 404 })
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
      return res.status(200).json({ message: 'The password has been changed successfully', status: 200 })
    } else {
      return res.status(500).json({ message: 'During changed password error occured', status: 500 })
    }
  } catch (error) {
    return res.status(404).json({ message: 'Invalid chnage password token', status: 404 })
  }
}

export default resetPasswordHandler
