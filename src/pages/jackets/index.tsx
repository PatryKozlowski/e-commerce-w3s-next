import NoProduct from '@/components/NoProduct/NoProduct'
import Products from '@/components/Products/Products'
import type { ProductsProps } from '@/components/Products/types'
import Wrapper from '@/components/Wrapper/Wrapper'
import prisma from '@/lib/utils/prisma'
import type { Products as ItemsProps, ProductType } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'

const JacketsPage = ({ products }: ProductsProps): JSX.Element => {
  return (
    <>

      <Head>
        <title>Clothes shop - Jackets</title>
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

export default JacketsPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { resolvedUrl } = ctx
  const productType = resolvedUrl.split('/').at(1) as ProductType

  const products: ItemsProps[] = await prisma.products.findMany({
    where: {
      product: productType
    }
  })

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }
}
