import { useState, useCallback } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import Layout from '@/components/Layout/Layout'
import type { ProvidersProps } from './types'
import 'react-toastify/dist/ReactToastify.css'

const Providers = ({ children, session }: ProvidersProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient())

  const { width } = useWindowDimensions()
  const SmallScreenCheck = useCallback((): boolean | undefined => {
    if (width !== null) {
      return width < 1024
    }
  }, [width])

  const isSmallScreen = SmallScreenCheck()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ToastContainer
            position={'top-center'}
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme={`${isSmallScreen ? 'light' : 'dark'}`}
          />
          <Layout>
            {children}
          </Layout>
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default Providers
