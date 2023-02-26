import Auth from '@/components/Auth/Auth'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RegisterPage = (): JSX.Element => {
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
        <title>Clothes shop - Create Account</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <Auth type={'register'}/>
    </>
  )
}

export default RegisterPage
