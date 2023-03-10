import prisma from '@/lib/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'

const deleteAccountHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized', status: res.statusCode })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)', status: res.statusCode })
  }

  const { pin: userPin } = req.body

  const email = session?.user?.email as string
  const userId = session?.user?.id as string

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found', status: res.statusCode })
  }

  if (user?.id !== userId) {
    return res.status(404).json({ message: 'Invalid user id', status: res.statusCode })
  }

  if (!userPin) {
    return res.status(404).json({ message: 'You must specify a password', status: res.statusCode })
  }

  const JWT_SECRET = process.env.JWT_SECRET as string
  const token = user.deleteToken as string
  const secret = `${String(JWT_SECRET)}${String(userPin)}`

  try {
    jwt.verify(token, secret)

    const userPinFormDb = user.deletePin as string
    const comparePin = await compare(userId, userPinFormDb)

    if (comparePin) {
      return res.status(404).json({ message: 'Incorrect PIN', status: res.statusCode })
    }

    const deleteAccount = await prisma.user.delete(({
      where: {
        id: userId
      }
    }))

    if (deleteAccount) {
      return res.status(200).json({ message: 'The account has been deleted', status: res.statusCode })
    } else {
      return res.status(400).json({ message: 'Something went wrong', status: res.statusCode })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }
    return res.status(404).json({ message: 'Invalid token', status: res.statusCode })
  }
}

export default deleteAccountHandler
