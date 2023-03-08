import CreateProduct from '@/components/CreateProduct/CreateProduct'
import Wrapper from '@/components/Wrapper/Wrapper'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

const CreatePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Create Product</title>
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
        <CreateProduct />
      </Wrapper>
    </>
  )
}

export default CreatePage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx })

  if (!session || session.user?.role !== 'admin') {
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
