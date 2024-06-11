import { ENDPOINTS } from '@/API/endpoints';
import FilterLayout from '@/components/categories/FilterLayout';
import { getSession } from '@/lib/lib';
import { Flex, Spinner } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import Loading from './loading';
import BreadCrumbs from '@/components/shared-components/breadcrumb/BreadCrumbs';
import SubCategoriesList from '@/components/categories/SubCategoriesList';
import CategoryLayout from '@/components/categories/CategoryLayout';

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

  console.log(data);
  return (
   <CategoryLayout data={data} params={params} token={token}  >
    {children}
   </CategoryLayout>
  )
}

export default layout