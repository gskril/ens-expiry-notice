import { AddSnapButton } from '@/components/AddSnapButton'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>ENS Renewal Snap</title>
        <meta
          name="description"
          content="A Snap to remind you about ENS name expirations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>gm</h1>
        <AddSnapButton />
      </main>
    </>
  )
}
