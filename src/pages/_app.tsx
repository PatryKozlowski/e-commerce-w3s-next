import { useEffect } from 'react'
import Providers from '@/components/Providers/Providers'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import '@/styles/globals.scss'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

export default function App ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [Router])

  if (pageProps.statusCode !== 404 && pageProps.statusCode !== 500) {
    return (
      <Providers
        session={pageProps.session}
        dehydratedState={pageProps.dehydratedState}
      >
        <Component {...pageProps} />
      </Providers>
    )
  } else {
    return (
      <Component {...pageProps} />
    )
  }
}
