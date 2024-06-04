"use client";
import React, { useState } from "react";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { AddToCart, postData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";
import { useCounter } from "@/lib/auth-content";

const CartButton = ({ selectedVariant, token, image }) => {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const toast = useToast();
  const { addItem } = useCounter();


  const clientCartItem = {
    quantity: 1,
    product_image: image?.image,
    product_variant: selectedVariant,
    id: selectedVariant.id
  };


  const handleAddToCart = async () => {
    if (token) {
      setIsRequestPending(true);
      const credentials = { product_variant: selectedVariant.id };

      try {
        const response = await postData(
          credentials,
          token,
          ENDPOINTS.postAddToCart()
        );
        // Check for a range of 2xx status codes
        if (response.status >= 200 && response.status < 300) {
          setIsRequestPending(false);
          increment();
          toast({
            title: "Товар успешно добавлен в корзину",
            status: "success",
            duration: 3000,
            position: "top-left",
            isClosable: true,
          });
        } else {
          toast({
            title: "Необходимо авторизоваться",
            status: "error",
            duration: 3000,
            position: "top-left",
            isClosable: true,
          });
          setIsRequestPending(false);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        if (isRequestPending) {
          setIsRequestPending(false);
        }
      }
    } else {
      addItem(clientCartItem);
      toast({
        title: "Товар успешно добавлен в корзину",
        status: "success",
        duration: 3000,
        position: "top-left",
        isClosable: true,
      });
    }
  };

  return (
    <Button
      w={"100%"}
      h={"32px"}
      minH={"unset"}
      borderRadius={"10px"}
      bg={"orange"}
      color={"#fff"}
      fontFamily={"roboto"}
      fontWeight={"400"}
      fontSize={"18px"}
      lineHeight={"25px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"10px"}
      mt={"20px"}
      maxW={"262px"}
      onClick={handleAddToCart}
      isLoading={isRequestPending}
      loadingText="Добавляем"
      colorScheme="teal"
      variant="outline"
      _hover={{ bg: "orange", color: "#fff" }}
    >
      <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6842 0.255087L10.7682 0.340087L15.4683 5.66673H19.0004C19.1427 5.66678 19.2834 5.69553 19.4131 5.75107C19.5427 5.8066 19.6583 5.88764 19.7521 5.98876C19.8459 6.08988 19.9158 6.20875 19.9571 6.33742C19.9983 6.46609 20.01 6.6016 19.9914 6.73489L19.9714 6.84066L17.9874 14.3187C17.7293 15.8091 16.5773 16.9452 15.1703 16.9991L15.0003 17L4.85215 16.9981C3.48213 16.9481 2.36811 15.9054 2.06511 14.5709L2.0301 14.3962L0.0300736 6.84066C-0.00461012 6.71013 -0.00935465 6.57411 0.0161579 6.4417C0.0416704 6.3093 0.0968508 6.18357 0.178002 6.07295C0.259153 5.96232 0.364401 5.86935 0.486694 5.80027C0.608986 5.73119 0.7455 5.68759 0.887087 5.67239L1.00009 5.66673H4.53014L9.23222 0.340087C9.31939 0.241221 9.42703 0.160219 9.54854 0.102049C9.67004 0.0438794 9.80285 0.0097683 9.93882 0.00180909C10.0748 -0.00615012 10.211 0.0122104 10.3392 0.0557639C10.4674 0.0993174 10.5848 0.167145 10.6842 0.255087ZM10.0002 8.50004C9.26509 8.49993 8.5555 8.75474 8.00615 9.21611C7.45681 9.67747 7.10595 10.3133 7.02018 11.0028L7.00518 11.1671L7.00018 11.3334L7.00518 11.4996C7.03955 12.0519 7.24441 12.5827 7.59446 13.0263C7.94452 13.47 8.42446 13.8071 8.97505 13.9962C9.52564 14.1852 10.1228 14.2179 10.6928 14.0901C11.2628 13.9623 11.7808 13.6798 12.1827 13.2772C12.5846 12.8747 12.853 12.3698 12.9546 11.8249C13.0563 11.28 12.9867 10.7189 12.7546 10.2109C12.5226 9.70289 12.138 9.27016 11.6486 8.96613C11.1591 8.6621 10.5861 8.50007 10.0002 8.50004ZM10.0002 2.41974L7.13518 5.66673H12.8653L10.0002 2.41974Z"
          fill="#fff"
        />
      </svg>
      {isRequestPending ? <Spinner color="pink" /> : "В корзину"}
    </Button>
  );
};

export default CartButton;
