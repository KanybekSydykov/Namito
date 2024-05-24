import LeaveReview from '@/components/reviews/LeaveReview'
import CartButton from '@/components/ui/CartButton'
import { Container, Flex, Text, Textarea, Button, Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const page = ({params}) => {
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
        >
            {/* prod info */}
            <Flex
            flexDir={'row'}
            gap={'16px'}
            justifyContent={'space-between'}
            w={'100%'}
            height={'90px'}
            >
                <Image src={'/product.png'} alt={'product'} width={100} height={100} style={{
                    borderRadius: '10px',
                    width:'80px',
                    height:'90px',
                }} />

                <Flex
                flexDir={'column'}
                justifyContent={'space-between'}
                width={'100%'}
                maxW={'262px'}
                >
                    <Text
                    fontFamily={'roboto'}
                    fontWeight={'500'}
                    fontSize={'16px'}
                    lineHeight={'22px'}
                    >
                    Джоггеры, карго от Neo
                    </Text>

                   <CartButton/>
                   
                </Flex>

            </Flex>

            {/* leave review */}

            <Flex
            w={'100%'}
            flexDir={'column'}
            gap={'20px'}
            >
                <Text
                fontFamily={'roboto'}
                fontWeight={'500'}
                fontSize={'18px'}
                lineHeight={'21px'}
                >
                    Оцените товар
                </Text>

                 <LeaveReview/>

                 <Textarea
                 rows={4}
                 resize={'none'}
                 placeholder='Оставьте отзыв о товаре'
                 fontFamily={'roboto'}
                 _placeholder={{
                    fontFamily:'roboto',
                    fontWeight:'300',
                    fontSize:'16px',
                    lineHeight:'24px',
                    color:'#767676'
                 }}
                 border={'1px solid #A0A0A0'}
                 borderRadius={'10px'}
                 ></Textarea>

                 <Flex
                 flexDir={'row'}
                 gap={'16px'}
                 h={'52px'}
                 >
                    <Button
                    width={'auto'}
                    h={'100%'}
                    display={'flex'}
                    flexGrow={1}
                    bg={'transparent'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    border={'1px solid orange'}
                    borderRadius={'10px'}
                    maxW={'320px'}
                    boxShadow={'0px 0px 2px rgba(0, 0, 0, 0.2)'}
                    color={'orange'}
                    fontFamily={'roboto'}
                    fontWeight={'400'}
                    fontSize={'16px'}
                    lineHeight={'24px'}
                    _hover={{
                        bg: 'orange',
                        color: 'white',
                    }}

                    >
                       * Оставить отзыв
                    </Button>

                    <Button
                    h={'100%'}
                    bg={'transparent'}
                    border={'1px solid #767676'}
                    w={'52px'}
                    borderRadius={'10px'}
                    boxShadow={'0px 0px 2px rgba(0, 0, 0, 0.2)'}
                    _hover={{
                        bg: 'rgb(54,54,54)',
                        color: 'white',
                    }}
                    >
                        UL
                    </Button>
                 </Flex>

            </Flex>
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

        <Flex
          flexDir={"column"}
          width={"auto"}
          gap={"20px"}
          py={"4px"}
          pb={'10px'}
        >
          {[1, 2].map((item,index,array) => (
            <Flex
              key={item}
              flexDir={"column"}
              width={'100%'}
              fontFamily={"roboto"}
              pb={'20px'}
              borderBottom={index === array.length - 1 ? 'none' : '1px solid #A0A0A0'}
            >
              <Flex flexDir={"row"} gap={"16px"} alignItems={"center"}>
                <Image
                  src={"/review-user-img.jpeg"}
                  alt="review-user-img"
                  width={64}
                  height={64}
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                />
                <Text
                  //styleName: 16 bold price;
                  fontSize={"16px"}
                  fontWeight={"700"}
                  lineHeight={"22.4px"}
                  color={"rgba(54, 54, 54, 1)"}
                >
                  Max
                </Text>
              </Flex>

              <Flex
                flexDir={"row"}
                mt={"20px"}
                gap={'33px'}
                alignItems={"center"}
              >
                <Flex flexDir={"row"} alignItems={"center"} gap={"2px"}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Box key={item} width={"14px"} h={"14pxs"}>
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.46557 1.04722C5.68826 0.610865 6.31174 0.610865 6.53443 1.04722L7.95965 3.83994C8.04683 4.01077 8.21042 4.12963 8.39984 4.15975L11.4963 4.65222C11.9801 4.72916 12.1728 5.32214 11.8266 5.66876L9.61096 7.88722C9.47543 8.02293 9.41294 8.21524 9.44283 8.40469L9.93132 11.5018C10.0076 11.9857 9.50323 12.3522 9.0666 12.13L6.27205 10.7084C6.10111 10.6214 5.89889 10.6214 5.72795 10.7084L2.9334 12.13C2.49677 12.3522 1.99235 11.9857 2.06868 11.5018L2.55717 8.40469C2.58705 8.21524 2.52457 8.02293 2.38904 7.88722L0.173418 5.66876C-0.172763 5.32214 0.0199063 4.72916 0.503714 4.65222L3.60016 4.15975C3.78958 4.12963 3.95317 4.01077 4.04035 3.83994L5.46557 1.04722Z"
                          fill="#FCB900"
                        />
                      </svg>
                    </Box>
                  ))}
                </Flex>
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"300"}
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  color={"rgba(134,134,134,1)"}
                  ms={"4px"}
                >
                  25.09.2023
                </Text>
              </Flex>

              <Text
                fontWeight={"300"}
                fontSize={"16px"}
                lineHeight={"24px"}
                mt={"20px"}
              >
                Одна из главных причин, по которой я выбрал Apple Watch SE, -
                это возможность отслеживать мою физическую активность Одна из
                главных причин, по которой я выбрал Apple Watch SE, - это
                возможность отслеживать мою физическую активность
              </Text>

              <Flex
                flexDir={"row"}
                gap={"8px"}
                flexWrap={"nowrap"}
                overflowX={"auto"}
                mt={"20px"}
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <Image
                    key={item}
                    src={"/prod-review-img.jpeg"}
                    alt="review-star"
                    width={49}
                    height={64}
                    style={{
                      width: "53px",
                      height: "64px",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </Flex>

            </Flex>
          ))}
        </Flex>
        </Flex>

    </Container>
    </>
  )
}

export default page