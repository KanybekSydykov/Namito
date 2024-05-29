import { ENDPOINTS } from '@/API/endpoints'
import LeaveReview from '@/components/reviews/LeaveReview'
import ReviewCard from '@/components/reviews/ReviewCard'
import ReviewForm from '@/components/reviews/ReviewForm'
import ReviewItem from '@/components/reviews/ReviewItem'
import CartButton from '@/components/ui/CartButton'
import { getData } from '@/lib/apiServices'
import { getSession } from '@/lib/lib'
import { Container, Flex, Text, Textarea, Button, Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const page = async ({ params }) => {

  const session = await getSession();
  const token = session?.access_token;

  console.log(params.reviewId);

  const res = await getData(token, ENDPOINTS.getProductReviews(params.reviewId));
  const productData = await getData(token, ENDPOINTS.getProductData(params.reviewId));

  console.log(productData);
  console.log(res.data.reviews);

  const reviews = res.data.reviews

  return (
    <>
      <Container
        maxW={'container.xl'}
      >
        <Text
          fontFamily={'roboto'}
          fontWeight={'400'}
          fontSize={'16px'}
          lineHeight={'24px'}
          color={'#A0A0A0'}
          my={'40px'}
        >
          {params.reviewId}
        </Text>

        <Flex
          flexDir={'row'}
          flexWrap={'wrap'}
          gap={'40px'}
          justifyContent={{ base: 'unset', lg: 'space-between' }}
        >
          {/* prod info */}
          <Flex
            flexDir={'row'}
            gap={'16px'}
            justifyContent={'space-between'}
            w={'100%'}
            maxW={'437px'}
            height={'90px'}
          >
            <Image src={productData.data.images[0].image} alt={'product'} width={100} height={100} style={{
              borderRadius: '10px',
              width: '80px',
              height: '90px',
            }} />

            <Flex
              flexDir={'column'}
              justifyContent={'flex-start'}
              gap={'22px'}
              width={'100%'}
              maxW={'262px'}
            >
              <Text
                fontFamily={'roboto'}
                fontWeight={'500'}
                fontSize={'18px'}
                lineHeight={'22px'}
              >
                {productData.data.name}
              </Text>
              <Text
                fontFamily={'roboto'}
                fontWeight={'400'}
                fontSize={'16px'}
                lineHeight={'22px'}
              >
                {productData.data.description}
              </Text>



            </Flex>

          </Flex>

          {/* leave review */}

          {res.data.review_allowed &&
            <ReviewForm  params={params} token={token}/>
          }
        </Flex>

        <Flex
          mt={'72px'}
          flexDir={'column'}
          gap={'20px'}
        >

          <Text
            pos={"relative"}
            fontFamily={"roboto"}
            fontWeight={"700"}
            fontSize={"20px"}
            lineHeight={"23.44px"}
            position={"relative"}
            width={"max-content"}
            color={'#363636'}
          >
            ОТЗЫВЫ
            <Image
              src="/review-star.svg"
              alt="decor-star"
              width={16}
              height={16}
              style={{
                position: "absolute",
                left: "100%",
                bottom: "10px",
                width: "20px",
                height: "20px",
              }}
            />
          </Text>

          {res.data.reviews.length ? <Flex
            flexDir={"column"}
            width={"auto"}
            gap={{base:"20px",lg:'40px'}}
            pt={{base:"4px",lg:'50px'}}
            pb={{base:'10px',lg:'50px'}}
          >
            {reviews.map((review, index, array) => (
              <ReviewItem key={index} borderBottom={index === array.length - 1 ? 'none' : '1px solid #A0A0A0'} review={review} />
            ))}
          </Flex>
            : <Flex
              fontFamily={'roboto'}
              fontSize={'16px'}
              lineHeight={'24px'}
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'20px'}
              textAlign={'center'}
              my={'50px'}
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
                {res.data.review_allowed ? 'Если Вы хотите оценить товар, оставьте отзыв' : "Если Вы хотите оценить товар, приоберете его и оставьте отзыв"}
              </Text>
            </Flex>
          }
        </Flex>

      </Container>
    </>
  )
}

export default page