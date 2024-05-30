'use client';

import React,{useState} from 'react'
import { Flex, Text,Box, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import ReviewModal from './ReviewModal';

const ReviewItem = ({review,borderBottom}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleModalVisibility(id) {
    setSelectedImage(id);
    onOpen();
  }

  return (
    <Flex
    flexDir={"column"}
    width={'100%'}
    fontFamily={"roboto"}
    pb={{base:'20px',lg:'40px'}}
    borderBottom={borderBottom}
  >
    <Flex flexDir={"row"} gap={"16px"} alignItems={"center"}>
      <Image
        src={review.user.profile_picture === null ? "/placeholder.jpeg" : review.user.profile_picture}
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
       {review.user.full_name}
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
                fill={review.rating >= item ?  "#FCB900" :  '#CDCDCD'}
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
       {review.created_at}
      </Text>
    </Flex>

    <Text
      fontWeight={"300"}
      fontSize={"16px"}
      lineHeight={"24px"}
      mt={"20px"}
    >
     {review.text}
    </Text>

    <Flex
      flexDir={"row"}
      gap={"8px"}
      flexWrap={"nowrap"}
      overflowX={"auto"}
      mt={"20px"}
    >
      {review.images.map((item,index) => (
        <Image
          key={item.id}
          src={item.image}
          alt="review-star"
          width={49}
          onClick={() => handleModalVisibility(index)}
          height={64}
          style={{
            width: "53px",
            height: "64px",
            borderRadius: "2px",
          }}
        />
      ))}
    </Flex>
    {isOpen && (
        <ReviewModal images={review.images} activeSlide={selectedImage} isOpen={isOpen} onClose={onClose} />
      )}

  </Flex>
  )
}

export default ReviewItem