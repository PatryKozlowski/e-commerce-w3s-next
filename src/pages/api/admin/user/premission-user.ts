import prisma from '@/lib/utils/prisma'
import type { Role } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const premissionUserHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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

  const isUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const isAdmin: Role = isUser?.role === 'admin' ? 'user' : 'admin'

  if (!isUser) {
    return res.status(400).json({ message: 'User not exists', status: res.statusCode })
  }

  if (isUser.id === session?.user?.id) {
    return res.status(400).json({ message: 'You cant do this', status: res.statusCode })
  }

  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: isAdmin
      }
    })

    return res.status(200).json({ message: isAdmin === 'admin' ? 'Admin privileges granted' : 'User privileges granted', status: res.statusCode })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', status: res.statusCode })
  }
}
export default premissionUserHandler
