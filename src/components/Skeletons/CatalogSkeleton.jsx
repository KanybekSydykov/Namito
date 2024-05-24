import CatalogItem from '@/components/categories/CatalogItem'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CatalogSkeleton = ({ params }) => {
  return (
    <Grid
      width={'100%'}
      px={{base:'16px',lg:'0'}}
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
        [0,1,2,3,4,5,6,7,8].map(item => (
          
      <GridItem
        key={item}
        pos={'relative'}
        bg={'rgba(205, 166, 255, 1)'}
        borderRadius={'8px'}
        width={'100%'}
        aspectRatio={1}
        overflow={'hidden'}
      >
      <Skeleton startColor="pink.500" endColor="orange.500" width={'100%'} height={'100%'} />

      </GridItem>
        ))
      }

    </Grid>
  )
}

export default CatalogSkeleton