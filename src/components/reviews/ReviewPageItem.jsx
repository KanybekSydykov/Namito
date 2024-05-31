'use client';

import React,{useState} from 'react'
import {Flex,Text,Image, Button} from '@chakra-ui/react'

const ReviewPageItem = ({data}) => {

    const [showMore, setShowMore] = useState(false)

    console.log(data);
  return (
    <Flex
    flexDir={'row'}
    gap={'22px'}
    justifyContent={'space-between'}
    w={'100%'}
    maxW={{base:'100%',lg:'437px'}}
    minH={'90px'}
    position={'relative'}
    flexGrow={1}
  >
    <Image src={data.images[0].image} alt={'product'} width={100} height={100} style={{
      borderRadius: '10px',
      width: '80px',
      height: '90px',
    }} />

    <Flex
      flexDir={'column'}
      justifyContent={'flex-start'}
      gap={'20px'}
      width={'100%'}
    >
      <Text
        fontFamily={'roboto'}
        fontWeight={'500'}
        fontSize={'18px'}
        lineHeight={'22px'}
      >
        {data.name}
      </Text>
      <Text
        fontFamily={'roboto'}
        fontWeight={'400'}
        fontSize={'16px'}
        lineHeight={'18px'}
        noOfLines={showMore ? 'unset' : 3}
      >
        {data.description}
      </Text>



    </Flex>


   <Button 
   position={'absolute'}
   top={'100%'}
   right={0}
   bg={'transparent'}
   color={'#000'}
   border={'unset'}
   outline={'unset'}
   boxShadow={'unset'}
   onClick={() => setShowMore(!showMore)}
   _hover={{
    bg: 'transparent',
    border: 'unset',
    outline: 'unset',
    boxShadow: 'unset',
    textDecoration: 'underline',
   }}
   >
       {showMore ? 'Скрыть' : 'Показать больше'}
    </Button>
  </Flex>
  )
}

export default ReviewPageItem