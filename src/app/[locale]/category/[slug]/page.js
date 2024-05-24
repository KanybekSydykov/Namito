import React from 'react'
import { Flex } from '@chakra-ui/react'
import Filters from '@/components/filters/Filters'
import ProdList from '@/components/products/product-list/ProdList'
import Sort from '@/components/sorting/Sort'
import SubCategoriesList from '@/components/categories/SubCategoriesList'
import BreadCrumbs from '@/components/shared-components/breadcrumb/BreadCrumbs'
import { ENDPOINTS } from '@/API/endpoints'
import {notFound} from 'next/navigation'



const page = async({ params ,searchParams}) => {
  const {slug} = params;
  const res = await fetch(`${ENDPOINTS.getCategoryData(slug)}`, {
    cache:'no-store',
    headers: {
      'Accept-Language': `${params.locale}`,
    }
  })
  
  const [data] = await res.json()

  if(!data){
    notFound()
  }

  return (
    <div>
     <BreadCrumbs locale={params.locale} data={{parent:data.parent,current:data.name}}/>

      <Flex
        maxW={{ base: "1200px", xl: "1472px" }}
        mx={'auto'}
        flexDir={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        gap={'30px'}
        px={{ base: '16px', xl: '0' }}
        pb={'100px'}
        position={'relative'}
        pt={{ base: '0px' }}
      >

        {/* filters           */}

        <Flex display={{ base: 'none', lg: 'flex' }}>

          <SubCategoriesList data={data.children} locale={params.locale} />
        </Flex>

        <Filters />

        <Sort />


        {/* products          */}

        <ProdList data={data.products} locale={params.locale}/>


      </Flex>

    </div>
  )
}

export default page