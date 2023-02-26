import RemindPassword from '@/components/RemindPassword/RemindPassword'
import Head from 'next/head'

const RemindPasswordPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Clothes shop -  Reset Password</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <RemindPassword />
    </>
  )
}

export default RemindPasswordPage
