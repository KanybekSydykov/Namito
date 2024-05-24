import CategoryItem from '@/components/categories/CategoryItem'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const page = ({params}) => {

  const {locale} = params;
  return (
    <Flex
      pt={{base:'20px',lg:'105px'}}
      pb={'150px'}
      px={'16px'}
      maxW={{ base: "1200px", xl: "1472px" }}
      width={'100%'}
      gap={'6px'}
      flexDir={'column'}
    >

<Grid width={"100%"} gap={{base:''}} gridTemplateColumns={{base:'repeat(1,minmax(0,1fr))',lg:'repeat(3,minmax(0,1fr))'}} height={'100%'}>
              <GridItem px={'30px'} display={'flex'} flexDir={'column'} gap={{base:'6px',lg:'12px'}}  py={'20px'} borderRight={{base:'unset',lg:'1px solid rgba(233, 233, 233, 1)'}}>
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />

              </GridItem>
              <GridItem px={'30px'} display={'flex'} flexDir={'column'} gap={'6px'} py={'20px'} borderRight={{base:'unset',lg:'1px solid rgba(233, 233, 233, 1)'}} >
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              </GridItem>
              <GridItem px={'30px'} display={'flex'} flexDir={'column'} gap={'6px'} py={'20px'} >
              <CategoryItem
                imgUrl={"/catalog-item-icon.svg"}
                locale={locale}
                
              />
              </GridItem>
            </Grid>
    </Flex>
  )
}

export default page