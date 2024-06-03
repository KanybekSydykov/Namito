"use client";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReviewCard from "../reviews/ReviewCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { deleteData, getData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";

const ProfileReviews = ({ token }) => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [requesting, setRequesting] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      setRequesting(true);
      try {
        const response = await getData(token, ENDPOINTS.getUserReviews(),params.locale);
        if (response.status >= 200 && response.status < 400) {
          setRequesting(false);
          setReviews(response.data);
          console.log(response);
        } else {
          setReviews([]);
          setRequesting(false);
        }
      } catch (error) {
        setReviews([]);
        setRequesting(false);
      }
    }

    if (token) {
      getOrders();
    }
  }, [token]);

  async function handleDeleteReview(id) {
    console.log(id);
    setReviews(reviews.filter((item) => item.id !== id));

    const response = deleteData(token, ENDPOINTS.deleteUserReview(id));
    console.log(response);
  }

  if (requesting) {
    return (
      <Flex
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size="xl" color="orange" />
      </Flex>
    );
  }
  return (
    <Flex
      flexDir={"column"}
      gap={"24px"}
      justifyContent={"center"}
      alignItems={"center"}
      pb={"30px"}
      px={{ base: "unset", lg: "20px" }}
      width={"auto"}
      flexGrow={{ base: "unset", lg: 1 }}
    >
      <Text
        fontWeight={"600"}
        fontSize={"20px"}
        lineHeight={"23.44px"}
        mb={"20px"}
      >
      {params.locale === "ru" ? "Ваши отзывы на приобретённые товары" : "Your reviews on purchased goods"}  
      </Text>

      {reviews.length > 0 ? (
        reviews.map((item, index) => (
          <ReviewCard
            handleDeleteReview={handleDeleteReview}
            key={item.id}
            item={item}
            width="100%"
            hasDeleteButton={true}
          />
        ))
      ) : (
        <Flex flexDir={"column"} gap={"24px"} px={"16px"}>
          <Flex
            fontFamily={"roboto"}
            fontSize={"16px"}
            lineHeight={"24px"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            textAlign={"center"}
          >
            <Image
              src={"/profile-icons/no-reviews-icon.svg"}
              alt={"no-reviews-icon"}
              width={50}
              height={50}
            />
            <Text fontWeight={"400"}>
              {params.locale === "ru" ? "Вы ещё не оставляли отзывов" : "You have not made any reviews"}</Text>
            <Text fontWeight={"300"}>
          {params.locale === "ru" ? "Если Вы хотите оценить приобретённый товар, выберите товар из списка" : "If you want to rate purchased goods, select the goods from the list"}
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileReviews;
