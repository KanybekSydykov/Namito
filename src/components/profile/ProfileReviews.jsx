'use client'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ReviewCard from '../reviews/ReviewCard'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getData } from '@/lib/apiServices'
import { ENDPOINTS } from '@/API/endpoints'

const reviews = [0,1,2,3]

const ProfileReviews = ({token}) => {
    const params = useParams()
    const [reviews, setReviews] = useState([])
    const [requesting, setRequesting] = useState(true)
    useEffect(() => {

        async function getOrders(){
    
            setRequesting(true);
          try{
            const response = await getData(token,ENDPOINTS.getUserReviews());
            if(response.status >= 200){
                setRequesting(false);
              setReviews(response.data);
            } else {
                setReviews([]);
                setRequesting(false);
            }
          }
          catch(error){
            setReviews([]);
            setRequesting(false);
          }
     
        }
    
        if(token){
          getOrders();
        }
      }, [token]);


  if(requesting){
    return <Flex
     width={'100%'}
     height={'100%'}
     justifyContent={'center'}
     alignItems={'center'}
     >
      <Spinner size='xl' color="orange" />
    </Flex>
  }
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

        {reviews?.map((item, index) => (
            <ReviewCard key={index} item={item} width='100%' hasDeleteButton={true} />
        ))}

        {!reviews.length
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