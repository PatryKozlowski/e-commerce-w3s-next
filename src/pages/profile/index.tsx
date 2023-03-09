import DeleteAccount from '@/components/DeleteAccount/DeleteAccount'
import { UserProps } from '@/components/UserAdress/types'
import UserAdress from '@/components/UserAdress/UserAdress'
import UserChangePassword from '@/components/UserChangePassword/UserChangePassword'
import Wrapper from '@/components/Wrapper/Wrapper'
import prisma from '@/lib/utils/prisma'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import styles from './Profile.module.scss'

const ProfilePage = ({ user }: UserProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop - Profile</title>
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
        <div className={styles.container}>
          <UserAdress user={user}/>
          <div className={styles.wrapper}>
            <UserChangePassword />
            <DeleteAccount />
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default ProfilePage

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

  const userInfo = await prisma.usersAdress.findUnique({
    where: {
      userId: session?.user?.id
    }
  })

  return {
    props: {
      user: JSON.parse(JSON.stringify(userInfo))
    }
  }
}
