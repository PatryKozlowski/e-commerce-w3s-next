import prisma from '@/lib/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const deleteUserHanlder = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (!session || session.user?.role === 'user') {
    return res.status(401).json({ message: 'Unauthorized', status: res.statusCode })
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'HTTP method not valid (only DELETE)', status: res.statusCode })
  }

  const userId = req.body

  if (!userId) {
    return res.status(400).json({ message: 'User id not exists', status: res.statusCode })
  }

  const isUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!isUser) {
    return res.status(400).json({ message: 'User not exists', status: res.statusCode })
  }

  if (isUser.id === session?.user?.id) {
    return res.status(400).json({ message: 'You cant do this', status: res.statusCode })
  }

  if (isUser.role === 'admin' && session?.user?.role === 'admin') {
    return res.status(400).json({ message: 'You cannot deleted an admin', status: res.statusCode })
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId
      }
    })
    return res.status(200).json({ message: 'User has been deleted', status: res.statusCode })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', status: res.statusCode })
  }
}

export default deleteUserHanlder
