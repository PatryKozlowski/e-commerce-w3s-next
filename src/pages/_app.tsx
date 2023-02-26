import Providers from '@/components/Providers/Providers'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'

import '@/styles/globals.scss'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

export default function App ({ Component, pageProps }: AppProps) {
  if (pageProps.statusCode !== 404 && pageProps.statusCode !== 500) {
    return (
      <Providers session={pageProps.session}>
        <Component {...pageProps} />
      </Providers>
    )
  } else {
    return (
      <Component {...pageProps} />
    )
  }
}
