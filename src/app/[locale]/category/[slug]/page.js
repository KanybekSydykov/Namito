import React from 'react'
import { Flex } from '@chakra-ui/react'
import Filters from '@/components/filters/Filters'
import ProdList from '@/components/products/product-list/ProdList'
import Sort from '@/components/sorting/Sort'
import SubCategoriesList from '@/components/categories/SubCategoriesList'
import BreadCrumbs from '@/components/shared-components/breadcrumb/BreadCrumbs'
import { ENDPOINTS } from '@/API/endpoints'
import {notFound} from 'next/navigation'
import { getSession } from '@/lib/lib'
import CategoryCover from '@/components/categories/CategoryCover'



const page = async({ params ,searchParams}) => {
  const {slug} = params;
  const session = await getSession();
  const token = session?.access_token;
  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  }

  if(token){
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${ENDPOINTS.getCategoryData(slug)}`, {
    cache:'no-cache',
    headers: headers
  })
  const responseData = await res.json()
  const [data] = responseData;


  if(!data){
    notFound()
  }

  return (
    <div>

    <CategoryCover data={data} params={params} token={session ? token : undefined} />
    </div>
  )
}

export default page