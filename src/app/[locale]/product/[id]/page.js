import { ENDPOINTS } from '@/API/endpoints'
import ProductPage from '@/components/products/productPage/ProductPage'
import { getData } from '@/lib/apiServices'
import { getSession } from '@/lib/lib'
import { Container } from '@chakra-ui/react'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

const page = async({params}) => {

  const session = await getSession();
  
  const token = session?.access_token;
  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  }

  if(token){
    headers['Authorization'] = `Bearer ${token}`
  }
  const productRes = await fetch(`${ENDPOINTS.getProductData(params.id)}`,{
    cache: 'no-cache',
    headers: headers
  })
  let data;
  if(productRes.status >= 200 && productRes.status < 400){
      data = await productRes.json()
  } else {
      notFound()
  }

  const similarProductsRes = await fetch(`${ENDPOINTS.getSimilarProducts(params.id)}`, {
    cache: 'no-store',
    headers: headers,
  })
  const similarProds = await similarProductsRes.json()



  const reviewRes = await fetch(`${ENDPOINTS.getProductReviews(params.id)}`, {
    headers: headers,
    cache: 'no-store',
  })

  const reviews = await reviewRes.json()


  return (
    <Container
    maxW={{ base: "1200px", xl: "1472px" }}
    px={'16px'}
    >
    <ProductPage params={params} reviews={reviews} details={data} similarProds={similarProds} token={session ? token : undefined} />
    </Container>
  )
}

export default page