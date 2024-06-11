import { ENDPOINTS } from '@/API/endpoints'
import ProductPage from '@/components/products/productPage/ProductPage'
import { getData } from '@/lib/apiServices'
import { getSession } from '@/lib/lib'
import { Container } from '@chakra-ui/react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import GlobalError from '../../global-error'
import Error from './error'
import { error } from 'console'

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params

  // fetch data

  try {
    const res = await fetch(`https://namito.tatadev.pro/api/product-seo/${params.id}/`, {
      cache: 'no-store'
    })

    if (res.ok) {
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
  }
  catch (error) {
    throw error;
  }
}


async function fetchData(headers, url) {
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: headers
    })

    if (res.ok) {
      const data = await res.json()
    return data
    } else {
     return undefined
    }
  } catch (error) {
    return undefined
  }
}

const page = async ({ params }) => {

  const session = await getSession();

  const token = session?.access_token;
  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }


  const product = await fetchData(headers, `${ENDPOINTS.getProductData(params.id)}`)

  if (!product) {
    notFound()
  }
  const similarProds = await fetchData(headers, `${ENDPOINTS.getSimilarProducts(params.id)}`)
  if(!similarProds) {
    notFound()
  }
  const reviews = await fetchData(headers, `${ENDPOINTS.getProductReviews(params.id)}`)
  if(!reviews) {
    notFound()
  }

  // const productRes = await fetch(`${ENDPOINTS.getProductData(params.id)}`, {
  //   cache: 'no-cache',
  //   headers: headers
  // })
  // let data;
  // if (productRes.status >= 200 && productRes.status < 400) {
  //   data = await productRes.json()
  // } else {
  //   notFound()
  // }

  // const similarProductsRes = await fetch(`${ENDPOINTS.getSimilarProducts(params.id)}`, {
  //   cache: 'no-store',
  //   headers: headers,
  // })
  // const similarProds = await similarProductsRes.json()



  // const reviewRes = await fetch(`${ENDPOINTS.getProductReviews(params.id)}`, {
  //   headers: headers,
  //   cache: 'no-store',
  // })

  // const reviews = await reviewRes.json()


  return (
    <ErrorBoundary fallback={<Error />}>
    <Container
      maxW={{ base: "1200px", xl: "1472px", '2xl': '1600px' }}
      px={'0'}
    >
      <ProductPage params={params} reviews={reviews} details={product} similarProds={similarProds} token={session ? token : undefined} />
    </Container>
    </ErrorBoundary>
  )
}

export default page