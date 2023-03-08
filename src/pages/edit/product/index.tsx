import ProductsList from '@/components/ProductsList/ProductsList'
import Wrapper from '@/components/Wrapper/Wrapper'
import { getProductsList } from '@/lib/services/admin/product/getProductsList'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

const EditProductPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Edit Product</title>
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
        <ProductsList />
      </Wrapper>
    </>
  )
}

export default EditProductPage

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

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['product'], getProductsList)
  return {
    props: {
      props: { dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) }
    }
  }
}
