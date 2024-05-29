"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import FavIconFalse from "/public/fav-icon.svg";
import FavIconTrue from "/public/favs-icon-colored.svg";
import { postData } from "@/lib/apiServices";
import { useParams } from "next/navigation";
import { ENDPOINTS } from "@/API/endpoints";

const FavButton = ({ id, token , isFavorite }) => {
  const [isFav, setIsFav] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast();
  const {locale} = useParams();

    useEffect(() => {
        if (isFavorite) {
            setIsFav(true);
        } else {
            setIsFav(false);
        }
    }, [isFavorite]);

  async function toggleFavourite(id) {
    setIsRequestPending(true);
    try {
      const body = {
        "product_id": id,
      };
      const response = await postData(
        body,
        token,
        ENDPOINTS.postToggleFavorite(id)
      );
      if (response.status >= 200 && response.status < 400) {
        setIsFav(true);
        setIsRequestPending(false);
      }
    } catch (error) {
      setIsFav(false);
    } finally {
      setIsRequestPending(false);
    }
  }


  
  function handleToggleFavourite(id) {
    console.log(token);
    if (token) {
      toggleFavourite(id);
    } else {
      toast({
        title: locale === 'en' ? "Please login first" : "Необходимо войти для добавления в избранное",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      position={"absolute"}
      right={"0px"}
      top={"0px"}
      p={"1px"}
      zIndex={20}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        isLoading={isRequestPending}
        variant="solid"
        color={'orange'}
        display={"flex"}
        w={"32px"}
        h={"32px"}
        borderRadius={"10px"}
        p={"7px 6px"}
        bg={"rgba(255, 255, 255, 1)"}
        minH={"unset"}
        minW={"unset"}
        // isDisabled={token ? false : true}
        onClick={() => handleToggleFavourite(id)}
      >
        <Image
          src={isFav || isHovered ? FavIconTrue : FavIconFalse}
          alt={"heart"}
          width={20}
          height={18}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Button>
    </Box>
  );
};

export default FavButton;
