import { ENDPOINTS } from '@/API/endpoints'
import CatalogItem from '@/components/categories/CatalogItem'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async({ params }) => {
  const catalogRes = await fetch(`${ENDPOINTS.getCategories()}`,{
    cache:'no-cache',
    'Accept-Language': `${params.locale}`,
  })

  const catalog = await catalogRes.json()

  return (
    <Grid
      width={'100%'}
      px={'16px'}
      maxW={{ base: "1200px", xl: "1472px" }}
      mx={'auto'}
      gridTemplateColumns=
      {
        {
          base:'repeat(2, minmax(171px,1fr))',
          md:'repeat(3, minmax(171px,1fr))',
          lg:'repeat(auto-fit,minmax(216px,1fr))',
        }
      }
      pt={{base:'50px',lg:'105px'}}
      pb={'100px'}
      gap={{base:'16px',lg:'30px'}}
    >
      {
        catalog.map(item => (
          

      <CatalogItem key={item.id} locale={params.locale} item={item} />


        ))
      }

    </Grid>
  )
}

export default page