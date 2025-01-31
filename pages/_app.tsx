import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from '@/components/layouts/Default'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <DefaultLayout>
  <Component {...pageProps} />
  </DefaultLayout>
  )
}
