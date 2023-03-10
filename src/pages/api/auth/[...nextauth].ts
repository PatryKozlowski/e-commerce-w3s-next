import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Cookies from 'cookies'
import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions, Session } from 'next-auth'
import { decode, encode } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import { compare } from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<Session> => {
  const data = requestWrapper(req, res)
  return NextAuth(...data)
}

export default authHandler

export function requestWrapper (req: NextApiRequest, res: NextApiResponse): [req: NextApiRequest, rest: NextApiResponse, options: NextAuthOptions] {
  const adapter = PrismaAdapter(prisma)

  const generateSessionToken = (): string => randomUUID()

  const fromDate = (time: number, date = Date.now()): Date => new Date(date + time * 1000)

  const options: NextAuthOptions = {
    debug: true,
    adapter,
    callbacks: {
      async session ({ session, user }) {
        if (session.user) {
          session.user.id = user.id
          const userRole = await prisma.user.findUnique({
            where: {
              id: user.id
            }
          })
          session.user.role = userRole?.role as string
        }
        return session
      },
      async signIn ({ user, account, profile, email, credentials }) {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          if (user) {
            const sessionToken = generateSessionToken()
            const sessionMaxAge = 60 * 60 * 24 * 30
            const sessionExpiry = fromDate(sessionMaxAge)

            await adapter.createSession({
              sessionToken,
              userId: user.id,
              expires: sessionExpiry
            })

            const cookies = new Cookies(req, res)

            cookies.set('next-auth.session-token', sessionToken, {
              expires: sessionExpiry
            })
          }
        }

        return true
      }
    },
    jwt: {
      encode: async ({ token, secret, maxAge }) => {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth.includes('credentials') &&
          req.method === 'POST'
        ) {
          const cookies = new Cookies(req, res)
          const cookie = cookies.get('next-auth.session-token')
          if (cookie) return cookie
          else return ''
        }

        return await encode({ token, secret, maxAge })
      },
      decode: async ({ token, secret }) => {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth.includes('credentials') &&
          req.method === 'POST'
        ) {
          return null
        }

        return await decode({ token, secret })
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
        name: 'CredentialsProvider',
        credentials: {},
        async authorize (credentials, req) {
          const { email, password } = credentials as {
            email: string
            password: string
          }

          const user = await prisma.user.findUnique({
            where: {
              email
            }
          })

          if (!user) {
            throw new Error('User not exists')
          }

          if (user.password === null) return null

          if (user.blocked) {
            throw new Error('Your account is blocked')
          }

          const compareHashedPassword = await compare(password, user.password)

          if (!compareHashedPassword || user.email !== email) {
            throw new Error('Email or password doesnt match')
          }

          return user
        }
      })
    ]
  }
  return [req, res, options]
}
