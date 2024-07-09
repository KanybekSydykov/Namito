"use client";

import {
  Flex,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Checkbox,
  textDecoration,
  Highlight,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CheckOutModal from "./CheckOutModal";
import { useParams } from "next/navigation";
import CartItem from "../cart/CartItem";
import { deleteData, postData, putData } from "@/lib/apiServices";
import ProfileAdresses from "../profile/ProfileAdresses";
import { motion } from "framer-motion";
import CheckoutProducts from "./CheckoutProducts";
import DeliveryMethod from "./DeliveryMethod";
import { ENDPOINTS } from "@/API/endpoints";
import { useRouter } from "next/navigation";


const CheckOut = ({ data, token }) => {
  const [deliveryValue, setDeliveryValue] = useState("курьером");
  const [adressValue, setAdressValue] = useState("");
  const [paymentValue, setPaymentValue] = useState({});
  const { locale } = useParams();
  const [cartData, setCartData] = useState(data.items);
  const [checkedItems, setCheckedItems] = useState(
    cartData ? cartData.map((item) => ({ id: item.id, to_purchase: true })) : []
  );
  const [orderPending, setOrderPending] = useState(false);
  const router = useRouter();

  const toast = useToast();

  const noItemsMsg = locale === "ru" ? "Ваша корзина пуста" : "Your cart is empty";
  const chooseDeliveryMsg = locale === "ru" ? "Выберите способ доставки" : "Choose delivery method";
  const errorMsg = locale === "ru" ? "Ошибка!" : "Error!"
  const successMsg = locale === "ru" ? "Заказ оформлен!" : "Order placed!"
  const congratsMsg = locale === "ru" ? "Спасибо!" : "Thank you!"
  function handleCheckedItem(id) {
    const newCheckItems = checkedItems.map((item) =>
      item.id === id ? { ...item, to_purchase: !item.to_purchase } : item
    );

    setCheckedItems(newCheckItems);
  }

  function handleSelectedAddress(value) {
    setAdressValue(value);
  }

  function handleSelectedPayment(value, text) {
    console.log(value, text);
    setPaymentValue({ value, text });
  }

  async function handleDeleteCartItem(id) {
    const filteredCartData = cartData.filter((item) => item.id !== id);
    setCartData(filteredCartData);
    const newCheckItems = checkedItems.filter((item) => item.id !== id);
    setCheckedItems(newCheckItems);
    try {
      const response = await deleteData(token,ENDPOINTS.deleteCartItem(id));
      if (response.status >= 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(deliveryValue);


  async function createOrder() {


    if(checkedItems.length){
      const newCartData = await putData(
        { items: checkedItems },
        token,
        ENDPOINTS.putCartQuantity()
      );
    } else {
      toast({
        title: errorMsg,
        description: noItemsMsg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if(!adressValue && deliveryValue === "курьером"){
      toast({
        title: errorMsg,
        description: chooseDeliveryMsg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const credentials = {
      delivery_method: deliveryValue,
      payment_method: paymentValue.value,
    };

    if(deliveryValue === "курьером"){
      credentials.user_address = adressValue;
    }



    try {
      setOrderPending(true);
      const response = await postData(
        credentials,
        token,
        ENDPOINTS.postOrder()
      );
      console.log(response);

      if (response.status >= 200 && response.status < 400) {
        setOrderPending(false);
        toast({
          title: congratsMsg ,
          description: successMsg,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCartData([]);
        router.push(`/${locale}`);
      } else {
        setOrderPending(false);
        toast({
          title: errorMsg,
          description: noItemsMsg,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrderPending(false);
    }
  }

  return (
    <Flex
      maxW={{ base: "1200px", xl: "1472px" }}
      flexDir={"column"}
      mx={"auto"}
      pb={"120px"}
      px={"16px"}
    >
      <Flex
        display={{ base: "flex", lg: "none" }}
        w={"100%"}
        flexDir={"row"}
        gap={"16px"}
        py={"10px"}
        alignItems={"center"}
        boxShadow={"0 1px 4px 0 rgba(151, 151, 151, 0.25)"}
      >
        <Text
          fontFamily={"roboto"}
          fontWeight={"700"}
          fontSize={"16px"}
          lineHeight={"22px"}
        >
          Корзина
        </Text>
      </Flex>

      <Flex
        flexDir={{ base: "column", lg: "row" }}
        gap={"30px"}
        mt={{ base: "20px", lg: "40px" }}
        position={"relative"}
      >
        {orderPending && (
          <Flex
            position={"absolute"}
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
            bg={"rgba(0,0,0,0.5)"}
            justifyContent={"center"}
            alignItems={"center"}
            zIndex={1}
          >
            <Spinner color="orange" size="xl" />
          </Flex>
        )}
        {/* Products */}
        <CheckoutProducts
          locale={locale}
          cartData={cartData}
          checkedItems={checkedItems}
          handleCheckedItem={handleCheckedItem}
          handleDeleteCartItem={handleDeleteCartItem}
        />
        <Flex flexDir={"column"} flexGrow={1} gap={"30px"}>
          {/* Delivery method */}
          <DeliveryMethod
            locale={locale}
            deliveryValue={deliveryValue}
            setDeliveryValue={setDeliveryValue}
          />

          {/* Addresses */}
          {deliveryValue === "курьером" && (
            <Flex
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              flexDir={"column"}
              gap={"30px"}
              p={"30px 10px"}
              mx={"16px"}
              boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
              borderRadius={"10px"}
              alignItems={"center"}
            >
              <Text
                fontWeight={"600"}
                fontSize={"18px"}
                lineHeight={"25.2px"}
                color={"#000"}
              >
                {locale === "ru" ? "Адрес доставки" : "Delivery address"}
              </Text>

              <ProfileAdresses
                params={locale}
                token={token}
                handleSelectedAddress={handleSelectedAddress}
              />
            </Flex>
          )}

          {/* Payment Method */}
          <Flex
            flexDir={"column"}
            p={"30px 10px"}
            mx={"16px"}
            boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
            borderRadius={"10px"}
            alignItems={"center"}
          >
            <Text
              fontWeight={"600"}
              fontSize={"18px"}
              lineHeight={"25.2px"}
              color={"#000"}
            >
              {locale === "ru" ? "Способ оплаты" : "Payment method"}
            </Text>
            <Text
              fontWeight={"300"}
              fontSize={"16px"}
              lineHeight={"24px"}
              color={"#000"}
              mt={"20px"}
            >
              <Highlight
                query={paymentValue.text ? paymentValue.text : ""}
                styles={{
                  color: "orange",
                  fontSize: "18px",
                  textDecoration: "underline",
                }}
              >
                {paymentValue.text
                  ? `${
                      locale === "ru"
                        ? "Выбраный способ оплаты"
                        : "Selected payment"
                    } ${paymentValue.text} `
                  : `${
                      locale === "ru"
                        ? "Выберите способ оплаты"
                        : "Choose payment method"
                    }`}
              </Highlight>
            </Text>

            <CheckOutModal
              handleSelectedPayment={handleSelectedPayment}
              createOrder={createOrder}
            >
              <Button
                mt={"16px"}
                width={"100%"}
                maxW={{ base: "100%", lg: "355px" }}
                textAlign={"center"}
                py={"15px"}
                borderRadius={"10px"}
                bg={"rgba(203, 70, 9, .75)"}
                color={"#fff"}
                fontSize={"18px"}
                lineHeight={"25px"}
                fontWeight={"400"}
                h={"auto"}
                display={"flex"}
                flexDir={"row"}
                gap={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                mx={"auto"}
                _hover={{
                  bg: "rgba(203, 70, 9, 1)",
                }}
              >
                <Text>
                  {locale === "ru"
                    ? `${
                        !paymentValue.text ? "Выбрать" : "Изменить"
                      } способ оплаты`
                    : "Choose payment method"}
                </Text>
              </Button>
            </CheckOutModal>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckOut;
