import Head from 'next/head'
import Link from 'next/link'
import pkg from '../../package.json';

export default function Home() {
  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 0.5rem'
      }}>
      <Head>
        <title>fullpage-swiper - Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>fullpage-swiper examples</h1>
        <Link href='/top-left'>- Top-left movement example</Link>
        <br />
        <Link href='/y-x'>- Y-X movement example</Link>
      </main>
      <footer style={{ marginTop: '10px' }}>
        Version: {pkg.version}
      </footer>
    </div>
  )
}
