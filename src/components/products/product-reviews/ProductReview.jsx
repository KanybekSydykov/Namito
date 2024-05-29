'use client';

import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";
import OrangeButton from "@/components/ui/OrangeButton";

const ProductReview = ({ title,params,productId ,token,reviews = [],reviewsAllowed = false}) => {
  // const [reviews, setReviews] = useState(false);

  // useEffect(() => {
  //   async function getProductReviews() {

  //     console.log(response);
  //     setReviews(response.data.reviews);
  //   }

  //   getProductReviews();
  // }, [productId]);

  // console.log(token);

  return (
    <Flex flexDir={"column"} gap={"26px"} id="reviews">
      <Text
        pos={"relative"}
        fontFamily={"roboto"}
        fontWeight={"700"}
        fontSize={{base:"20px",lg:'36px'}}
        lineHeight={{base:"23.44px",lg:'50px'}}
        color={"rgba(54, 54, 54, 1)"}
        ps={"16px"}
        position={"relative"}
        width={"max-content"}
      >
        {title ? title : "ОТЗЫВЫ"}
        <Image
          src="/review-star.svg"
          alt="decor-star"
          width={16}
          height={16}
          style={{
            position: "absolute",
            left: "100%",
            top:0,
            width: "20px",
            height: "20px",
          }}
        />
      </Text>
      {reviews.length ? (
        <Flex
          flexDir={"row"}
          width={"auto"}
          gap={"16px"}
          overflowX={"auto"}
          py={"4px"}
          px={"16px"}
        >
          {reviews.map((item,idx) => (
           <ReviewCard key={idx} item={item} />
          ))}
        </Flex>)
        : 
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
            Отзывов нет
            </Text>
            <Text
            fontWeight={'300'}
            >
           {reviewsAllowed ? "Вы можете оставить отзыв на данный товар" : "Для того чтобы оставить отзыв на данный товар вы должны его приобрести"}
            </Text>
        </Flex>  
        }
      

   { reviews.length > 0 && 
   
   <Flex
   flexDir={'row'}
   justifyContent={'space-between'}
   px={'16px'}
   >
     {reviewsAllowed &&   <Link href={`/${params.locale}/reviews/${productId}`}>
      <OrangeButton text={"Оставить отзыв"} />
        </Link>}
   <Link
        href={`/${params.locale}/reviews/${productId}`}
        style={{
          fontFamily: "var(--chakra-fonts-roboto)",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          color: "rgb(54,54,54)",
          textAlign: "end",
          padding: "0 16px",
          marginTop: "20px",
          textDecoration: "underline",
        }}
      >
        Смотреть все отзывы
      </Link>
    </Flex>
    
      }

    
    </Flex>
  );
};

export default ProductReview;
