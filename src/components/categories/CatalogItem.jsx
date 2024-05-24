import React from 'react'
import Link from 'next/link'
import { Text, Box } from '@chakra-ui/react'
import Image from 'next/image'

const CatalogItem = ({locale}) => {
  return (
    <Link href={`/${locale}/catalog/category?id=1`} style={{ padding:'16px',width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
    <Text
      fontFamily={'roboto'}
      fontWeight={'700'}
      fontSize={'16px'}
      lineHeight={'24px'}
      color={'#000'}
    >
      Одежда
    </Text>
    <Box
      position={'absolute'}
      right={'-30px'}
      bottom={'-30px'}
      w={'150px'}
      h={'150px'}
    >
      <Image src={'/catalog-img.png'} width={150} height={150} style={{
        width: '100%',
        height: '100%',
      }} />
    </Box>
  </Link>
  )
}

export default CatalogItem