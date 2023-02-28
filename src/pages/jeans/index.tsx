import NoProduct from '@/components/NoProduct/NoProduct'
import Products from '@/components/Products/Products'
import type { ProductsProps } from '@/components/Products/types'
import Wrapper from '@/components/Wrapper/Wrapper'
import prisma from '@/lib/utils/prisma'
import type { Products as ItemsProps } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'

const JeansPage = ({ products }: ProductsProps): JSX.Element => {
  return (
    <>

      <Head>
        <title>Clothes shop - Jeans</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      {
        !products.length ?
          <NoProduct />
          :
          <Wrapper>
            <Products
              products={products}
            />
          </Wrapper>
      }
    </>
  )
}

export default JeansPage

export const getServerSideProps: GetServerSideProps = async () => {
  const products: ItemsProps[] = await prisma.products.findMany()

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }
}
