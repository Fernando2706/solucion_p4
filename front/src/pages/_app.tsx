import Spinner from '@/components/spinner'
import { LoadingProvider } from '@/hooks/useLoading'
import type { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <>
      <Spinner/>
      <ToastContainer />
      <Component {...pageProps} /></>
    </LoadingProvider>
  )
}
