import React from 'react'
import Home from '@/components/homepage/Home'
import { ENDPOINTS } from '@/API/endpoints'

export const dynamic = 'force-dynamic'


const page = async ({ params }) => {
  const res = await fetch(`${ENDPOINTS.getMainPage()}`, {
    cache: 'no-store',
    headers: {
      'Accept-Language': `${params.locale}`,
    }
  })
  const data = await res.json()

  const res2 = await fetch(`${ENDPOINTS.getNewProducts()}`, {
    cache: 'no-store',
    headers: {
      'Accept-Language': `${params.locale}`,
    }
  })
  const newProducts = await res2.json()

  const res3 = await fetch(`${ENDPOINTS.getAllProducts()}`, {
    cache: 'no-store',
    headers: {
      'Accept-Language': `${params.locale}`,
    }
  })
  const products = await res3.json()

  return (


      <Home data={data} newProducts={newProducts} products={products} locale={params.locale} />

  )
}

export default page