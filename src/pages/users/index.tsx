import UsersList from '@/components/UsersList/UsersList'
import Wrapper from '@/components/Wrapper/Wrapper'
import { getUsers } from '@/lib/services/admin/user/getUsers'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

const UsersPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Edit Users</title>
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
        <UsersList />
      </Wrapper>
    </>
  )
}

export default UsersPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx })

  if (!session || session.user?.role === 'user') {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      }
    }
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['users'], getUsers)
  return {
    props: {
      props: { dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) }
    }
  }
}
