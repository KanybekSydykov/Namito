"use client";

import { Grid, GridItem, Flex, Text, Box, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Product from "../products/product-card/Product";
import { ENDPOINTS } from "@/API/endpoints";
import { getData } from "@/lib/apiServices";


const ProfileFavourites = ({ token }) => {
  const [favs, setFavs] = useState([]);
  const [requesting, setRequesting] = useState(true);
  useEffect(() => {
    async function getOrders() {
      setRequesting(true);
      try {
        const response = await getData(token, ENDPOINTS.getUserFavorites());
        if (response.status >= 200) {
          setRequesting(false);
          setFavs(response.data);
        } else {
          setFavs([]);
          setRequesting(false);
        }
      } catch (error) {
        setFavs([]);
        setRequesting(false);
      }
    }

    if (token) {
      getOrders();
    }
  }, [token]);

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

  console.log(favs);

  return (
    <>{favs.length ? (
        <Grid
          gridTemplateColumns={{
            base: "repeat(2, minmax(171px,1fr))",
            lg: "repeat(2, minmax(171px,1fr))",
          }}
          gap={"16px"}
          mx={"16px"}
        >
          {favs.map((item, index) => (
            <GridItem key={index}>
              <Product details={item.product} token={token}  />
            </GridItem>
          ))}
        </Grid>
      )
      :(
        <Flex
          flexDir={"column"}
          gap={"24px"}
          px={{ base: "16px", lg: "150px" }}
          py={"50px"}
          w={"100%"}
        >
          <Flex
            fontFamily={"roboto"}
            fontSize={"16px"}
            lineHeight={"24px"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            textAlign={"center"}
            position={"relative"}
          >
            <Box
              width={{
                base: "50px",
                lg: "128px",
              }}
              height={{
                base: "50px",
                lg: "128px",
              }}
              position={"relative"}
            >
              <Image src={"/no-favs-icon.svg"} fill />
            </Box>
            <Text fontWeight={"400"}>
              Вы ещё не добавляли товары в избранное
            </Text>
            <Text fontWeight={"300"}>
              Чтобы сохранить товар в избранных, нажмите значок
            </Text>
            <Flex
              display={"inline-flex"}
              w={"32px"}
              h={"32px"}
              borderRadius={"10px"}
              bg={"rgba(255, 255, 255, 1)"}
              justifyContent={"center"}
              alignItems={"center"}
              boxShadow={"0 0 4px 1px rgba(151, 151, 151, 0.25)"}
            >
              <Image
                src={"/fav-icon.svg"}
                alt={"heart"}
                width={20}
                height={20}
              />
            </Flex>
            <Text fontWeight={"300"}>
              на карточке товара или на странице товара
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ProfileFavourites;
