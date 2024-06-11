"use client";
import { Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useCounter } from "@/lib/auth-content";
import { ENDPOINTS } from "@/API/endpoints";
import { useParams } from "next/navigation";
import { getData } from "@/lib/apiServices";

const CartCounter = ({ token }) => {
  const { locale } = useParams();
  const { getTotalQuantity } = useCounter();
  const [cart, setCart] = useState([]);


  async function getServerCart() {
    const response = await getData(token, ENDPOINTS.getCartData(), locale);
    const data = response.data;
    setCart(data);
  }

  const handleTotalQuantity = () => {
    if (cart.length) {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }
  };

  useEffect(() => {
    if (token) {
      getServerCart();
    }
  }, [token]);

  function displayCounter() {
    let serverCounter =
      handleTotalQuantity() === 0 ? "" : handleTotalQuantity();
    let clientCounter = getTotalQuantity() === 0 ? "" : getTotalQuantity();

    if (token) {
      return serverCounter;
    } else {
      return clientCounter;
    }
  }


  return (
    <AnimatePresence>
      <Text
        as={motion.p}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: [30, 20, 10, 0] }}
        transition={{ duration: 0.15, type: "spring" }}
        pos={"absolute"}
        top={"-10px"}
        right={"-10px"}
        color={"orange"}
        filter={"unset"}
        fontSize={"14px"}
        fontFamily={"roboto"}
      >
        {displayCounter()}
      </Text>
    </AnimatePresence>
  );
};

export default CartCounter;
