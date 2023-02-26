import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ForgotPassword from '@/components/ForgotPassword/ForgotPassword'

const ForgotPasswordPage = (): JSX.Element => {
  const sesson = useSession()
  const router = useRouter()

  useEffect(() => {
    if (sesson?.status === 'authenticated') {
      void router.push('/')
    }
  }, [router, sesson?.status])

  return (
    <>
      <Head>
        <title>Clothes shop -  Reset Password</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <ForgotPassword />
    </>
  )
}

export default ForgotPasswordPage
