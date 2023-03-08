import EditProduct from '@/components/EditProduct/EditProduct'
import type { ProductEditProps } from '@/components/EditProduct/types'
import Wrapper from '@/components/Wrapper/Wrapper'
import prisma from '@/lib/utils/prisma'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

const EditOnePage = ({ product, sizes }: ProductEditProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Edit {product?.name}</title>
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
        <EditProduct
          product={product}
          sizes={sizes}
        />
      </Wrapper>
    </>
  )
}

export default EditOnePage

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
      sizeXS: true,
      sizeS: true,
      sizeM: true,
      sizeL: true,
      sizeXL: true
    }
  })

  const sizes = [...product?.sizeXS ?? [], ...product?.sizeS ?? [], ...product?.sizeM ?? [], ...product?.sizeL ?? [], ...product?.sizeXL ?? []]

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      sizes: JSON.parse(JSON.stringify(sizes))
    }
  }
}
