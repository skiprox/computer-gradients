import Head from 'next/head';
import Screen from 'components/Screen';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Computer Screen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Screen></Screen>
      </main>
    </div>
  )
}
