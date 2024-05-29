'use client'

import React,{useEffect,useState} from 'react'
import { Flex } from '@chakra-ui/react'
import SubCategoriesList from '@/components/categories/SubCategoriesList'
import Filters from '@/components/filters/Filters'
import Sort from '@/components/sorting/Sort'
import ProdList from '@/components/products/product-list/ProdList'
import { ENDPOINTS } from '@/API/endpoints'
import BreadCrumbs from '../shared-components/breadcrumb/BreadCrumbs'

const CategoryCover = ({data,params,token}) => {
    const [filter,setFilters] = useState({})
    const [sorting,setSorting] = useState('')

    function handleFilters(title,value){
        setFilters((prev) => ({ ...prev, [title]: value }));
        console.log(title,value);
    }

    function handleSorting(value){
        setSorting(value)
    }

    console.log(filter,sorting);

  return (
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
     <BreadCrumbs locale={params.locale} data={{parent:data.parent,current:data.name}}/>


    {/* filters           */}

    <Flex display={{ base: 'none', lg: 'flex' }}>

      <SubCategoriesList data={data.children} locale={params.locale} />
    </Flex>

    <Filters data={data} handleFilters={handleFilters} />

    <Sort handleSorting={handleSorting}/>


    {/* products          */}

    <ProdList token={token} data={data.products} locale={params.locale}/>


  </Flex>

  )
}

export default CategoryCover