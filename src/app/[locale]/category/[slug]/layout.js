import { ENDPOINTS } from '@/API/endpoints';
import FilterLayout from '@/components/categories/FilterLayout';
import { getSession } from '@/lib/lib';
import { Flex, Spinner } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import Loading from './loading';

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params

  // fetch data
  const res = await fetch(`https://namito.tatadev.pro/api/category-seo/${params.slug}/`,{
    cache:'no-store'
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

const layout = async({children,params}) => {

  const { slug } = params;
  const session = await getSession();
  const token = session?.access_token;
  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${ENDPOINTS.getCategoryData(slug)}`, {
    cache: 'no-cache',
    headers: headers
  })
  const responseData = await res.json()
  const [data] = responseData;
  return (
    <Flex
    maxW={{ base:'100%', lg:"1200px", xl: "1200px", "2xl": "1440px" }}
    mx={"auto"}
    flexDir={"row"}
    flexWrap={"wrap"}
    justifyContent={"space-between"}
    gap={"30px"}
    px={{ base: "16px", xl: "0" }}
    pb={"100px"}
    position={"relative"}
    pt={{ base: "50px" }}
  >
    {/* <BreadCrumbs
      locale={params.locale}
      data={{ parent: data.parent, current: data.name }}
    /> */}

    {/* Filters */}


    <Flex gap={'30px'} flexDir={{base:'column',lg:'row'}} w={'100%'}>

    <FilterLayout data={data} params={params} children={children}  />
    <Suspense fallback={<Loading />}>
   {children}
   </Suspense>

    </Flex>

    </Flex>
  )
}

export default layout