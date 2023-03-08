import Success from '@/components/Success/Success'
import Wrapper from '@/components/Wrapper/Wrapper'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

const SuccessPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Success</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <Wrapper>
        <Success />
      </Wrapper>
    </>
  )
}

export default SuccessPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {}
  }
}
