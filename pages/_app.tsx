import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </>
  );
}

export default MyApp;