import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
       <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
          <script src="https://unpkg.com/hammerjs@2.0.8/hammer.min.js"></script>
          <script src="https://unpkg.com/gsap@3.5.1/dist/gsap.min.js"></script>
       </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
