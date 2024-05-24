import { ENDPOINTS } from '@/API/endpoints'
import ProductPage from '@/components/products/productPage/ProductPage'
import { Container } from '@chakra-ui/react'
import React from 'react'

const page = async({params}) => {

  const res = await fetch(`${ENDPOINTS.getProductData(params.id)}`, {
    headers: {
      'Accept-Language': `${params.locale}`,
    },
    next: { revalidate: 600 },
  })
  
  const data = await res.json()

  const res2 = await fetch(`${ENDPOINTS.getSimilarProducts(params.id)}`, {
    headers: {
      'Accept-Language': `${params.locale}`,
    },
    cache: 'no-cache',
  })
  
  const similarProds = await res2.json()

  console.log(similarProds);

  return (
    <Container
    maxW={{ base: "1200px", xl: "1472px" }}
    px={'16px'}
    >
    <ProductPage params={params} details={data} similarProds={similarProds} />
    </Container>
  )
}

export default page