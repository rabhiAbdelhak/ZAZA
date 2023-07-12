import { useEffect } from 'react'
import Head from 'next/head'
import { MainLayout } from '../components/main-layout'
import { gtm } from '../lib/gtm'

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Home | zimou express Dashboard</title>
      </Head>
      <MainLayout></MainLayout>
    </>
  )
}

export default Home
