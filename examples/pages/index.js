import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>fullpage-swiper examples</h1>
        <Link href='/top-left'>- Top-left movement example</Link>
        <br />
        <Link href='/y-x'>- Y-X movement example</Link>
      </main>
    </div>
  )
}
