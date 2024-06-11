'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import {Flex, Text, Box} from '@chakra-ui/react'
import Sort from '../sorting/Sort'


const SubCategoriesList = ({data,locale,handleSorting}) => {

  useEffect(() => {
  },[data])

  return (
    <Flex flexDir={'row'} justifyContent={'space-between'} width={'100%'}>
    <Flex
    flexDir={'row'}
    width={'max-content'}
    overflowX={'auto'}
    gap={'16px'}
    py={'2px'}
    minH={'40px'}
    px={'2px'}
    >
      {data?.map((item, index) => (
          <Box as={Link}
          w={'fit-content'}
          py={'10px'}
          px={'20px'}
          borderRadius={'50px'}
          boxShadow={'0 0 4px 0 rgba(151, 151, 151, 0.25)'}
          href={`/${locale}/category/${item.slug}`}
          key={index}
          _hover={{
            bg: 'rgba(255, 211, 191, 1)',
          }}
          _focus={{
            bg: 'rgba(255, 211, 191, 1)',
          }}
          transition={'all 0.2s ease-in-out'}
          >
          
            <Text
            fontFamily={'roboto'}
            fontSize={'16px'}
            fontWeight={'400'}
            lineHeight={'24px'}
            >
             {item.name}
            </Text>
          </Box>
      ))}

   
    </Flex>
    <Sort handleSorting={handleSorting} />

    </Flex>
  )
}

export default SubCategoriesList