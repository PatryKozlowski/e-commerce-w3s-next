import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const blockUserHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role === 'user' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'HTTP method not valid (only PATCH)', status: res.statusCode })
  }

  const { id: userId } = req.body

  if (!userId) {
    return res.status(400).json({ message: 'User id not exists', status: res.statusCode })
  }

  let isBlock = false

  try {
    const isUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    isBlock = isUser?.blocked ?? false

    if (!isUser) {
      return res.status(400).json({ message: 'User not exists', status: res.statusCode })
    }

    if (isUser.role === 'admin' && session?.user?.role === 'admin') {
      return res.status(400).json({ message: 'You cannot block an admin', status: res.statusCode })
    }

    if (isUser.id === session?.user?.id) {
      return res.status(400).json({ message: 'You cannot block yourself', status: res.statusCode })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        blocked: !isBlock
      }
    })

    return res.status(200).json({ message: isBlock ? 'User has been unblocked' : 'User has been blocked', status: res.statusCode })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', status: res.statusCode })
  }
}
export default blockUserHandler
