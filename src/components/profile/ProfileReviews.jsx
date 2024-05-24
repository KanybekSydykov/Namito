'use client'

import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import ReviewCard from '../reviews/ReviewCard'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const reviews = [0,1,2,3]

const ProfileReviews = () => {
    const params = useParams()
  return (
    <Flex
    flexDir={'column'}
    gap={'24px'}
    justifyContent={'center'}
    alignItems={'center'}
    pb={'30px'}
    px={{base:'unset',lg:'20px'}}
    width={'auto'}
    flexGrow={{base:'unset',lg:1}}
    >
         <Text
                fontWeight={'600'}
                fontSize={'20px'}
                lineHeight={'23.44px'}
                mb={'20px'}
                >
                   Ваши отзывы на приобретённые товары
                </Text>

        {reviews && reviews.map((item, index) => (
            <ReviewCard key={index} item={item} width='100%' hasDeleteButton={true} />
        ))}

        {!reviews
         && 
         <Flex
         flexDir={'column'}
         gap={'24px'}
         px={'16px'}
         >

            <Flex
            fontFamily={'roboto'}
            fontSize={'16px'}
            lineHeight={'24px'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'20px'}
            textAlign={'center'}
            >
                <Image src={'/profile-icons/no-reviews-icon.svg'} width={50} height={50} />
                <Text
                fontWeight={'400'}
                >
                Вы ещё не оставляли отзывов
                </Text>
                <Text
                fontWeight={'300'}
                >
                Если Вы хотите оценить приобретённый товар, выберите товар из списка
                </Text>
            </Flex>  

            {/* <Flex flexDir={'column'} gap={'16px'} mt={'40px'}>
                <Text
                fontWeight={'600'}
                fontSize={'20px'}
                lineHeight={'23.44px'}
                mb={'20px'}
                >
                   Ваши отзывы на приобретённые товары
                </Text>
            <Flex flexDir={'row'} justifyContent={'flex-start'} borderBottom={'1px solid rgba(232, 236, 239, 1)'} pb={'16px'} alignItems={'center'} gap={'16px'}>
                <ReviewCard width='100%'/>
            </Flex>
            
            </Flex>   */}

         
         </Flex>
         }

    </Flex>
  )
}

export default ProfileReviews