import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const getUsersHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (session?.user?.role === 'user' || !session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'HTTP method not valid (only GET)', status: res.statusCode })
  }

  try {
    const users = await prisma.user.findMany()
    return res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export default getUsersHandler
