import NoProduct from '@/components/NoProduct/NoProduct'
import OneProduct from '@/components/OneProduct/OneProduct'
import prisma from '@/lib/utils/prisma'
import type { GetServerSideProps } from 'next'
import type { OneProductProps } from '@/components/OneProduct/types'
import Wrapper from '@/components/Wrapper/Wrapper'
import Head from 'next/head'

const OneShoesPage = ({ product, sizes }: OneProductProps): JSX.Element => {
  if (!product) {
    return (
      <NoProduct text={'Product not available'}/>
    )
  }

  return (
    <>
      <Head>
        <title>Clothes shop - {product.name}</title>
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
        <OneProduct
          product={product}
          sizes={sizes}
        />
      </Wrapper>
    </>
  )
}

export default OneShoesPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx
  const id = params?.id as string

  const product = await prisma.products.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      product: true,
      jeansType: true
    }
  })

  const sizeXS = await prisma.sizeXS.findUnique({
    where: {
      productId: id
    }
  })
  const sizeS = await prisma.sizeS.findUnique({
    where: {
      productId: id
    }
  })
  const sizeM = await prisma.sizeM.findUnique({
    where: {
      productId: id
    }
  })
  const sizeL = await prisma.sizeL.findUnique({
    where: {
      productId: id
    }
  })
  const sizeXL = await prisma.sizeXL.findUnique({
    where: {
      productId: id
    }
  })

  const rawSizes = [sizeXS, sizeS, sizeM, sizeL, sizeXL]
  const sizes = rawSizes?.filter(element => {
    return element !== null && element?.stock > 0
  })

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      sizes: JSON.parse(JSON.stringify(sizes))
    }
  }
}
