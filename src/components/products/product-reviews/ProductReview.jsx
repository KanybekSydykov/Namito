'use client';

import React from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ReviewCard from "@/components/reviews/ReviewCard";

const ProductReview = ({ title,params,id }) => {
  const reviews = false;

  return (
    <Flex flexDir={"column"} gap={"26px"}>
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
            bottom: "10px",
            width: "20px",
            height: "20px",
          }}
        />
      </Text>
      {reviews ? (
        <Flex>

        </Flex>
      ) : (
        <Flex
          flexDir={"row"}
          width={"auto"}
          gap={"16px"}
          overflowX={"auto"}
          py={"4px"}
          px={"16px"}
        >
          {[1, 2, 3, 4, 5, 6].map((item,idx) => (
           <ReviewCard key={idx} item={item} />
          ))}
        </Flex>
      )}

      <Link
        href={`/${params.locale}/reviews/1`}
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
  );
};

export default ProductReview;
