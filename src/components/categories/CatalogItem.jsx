'use client'

import React from 'react'
import Link from 'next/link'
import { Text, Box, GridItem } from '@chakra-ui/react'
import Image from 'next/image'

const CatalogItem = ({locale,item}) => {
  return (
    <GridItem
    pos={'relative'}
    bg={item.background_color}
    borderRadius={'8px'}
    width={'100%'}
    aspectRatio={1}
    overflow={'hidden'}
    transition={'all 0.3s ease'}
    _hover={{
      filter: 'hue-rotate(40deg)',
      bg: item.background_color === '#000000' ? 'orange' : item.background_color,
    }}
  >
    <Link href={`/${locale}/category/${item.slug}`} style={{ padding:'16px',width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
    <Text
      fontFamily={'roboto'}
      fontWeight={'700'}
      fontSize={'16px'}
      lineHeight={'24px'}
      color={item.background_color === '#000000' ? '#fff' : '#000'}
    >
      {item.name}
    </Text>
    <Box
      position={'absolute'}
      right={'0px'}
      bottom={'0px'}
      w={{base:'120px',lg:'150px'}}
      h={{base:'120px',lg:'150px'}}
    >
      <Image src={item.image ? item.image : '/catalog-img.png'} width={150} height={150} style={{
        width: '100%',
        height: '100%',
      }} />
    </Box>
  </Link>
  </GridItem>
  )
}

export default CatalogItem