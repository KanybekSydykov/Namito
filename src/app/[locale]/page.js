import React from 'react'
import Home from '@/components/homepage/Home'
import { ENDPOINTS } from '@/API/endpoints'
import { getSession } from '@/lib/lib'

// export const dynamic = 'force-dynamic'
export async function generateMetadata({ params, searchParams }, parent) {
  // read route params

  // fetch data
  const res = await fetch(`https://namito.tatadev.pro/api/layout-meta/`,{
    cache: 'no-store'
  })
  const meta = await res.json()

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: meta.meta_title,
    description: meta.meta_description,
    openGraph: {
      description: meta.meta_description,
      title: meta.meta_title,
      images: [{ url: meta.meta_image }, ...previousImages],
    },
  }
}


const page = async ({ params }) => {
  const session = await getSession();
  const token = session?.access_token
  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(`${ENDPOINTS.getMainPage()}`, {
    cache: 'no-cache',
    headers: headers
  })
  const data = await res.json()

  const res2 = await fetch(`${ENDPOINTS.getNewProducts()}`, {
    cache: 'no-store',
    headers: headers
  })
  const newProducts = await res2.json()

  const res3 = await fetch(`${ENDPOINTS.getAllProducts()}`, {
    cache: 'no-store',
    headers: headers
  })
  const products = await res3.json()



  return (
    <Home data={data} newProducts={newProducts} products={products} token={token} locale={params.locale} />


  )
}

export default page