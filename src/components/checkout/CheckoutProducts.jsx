import React from 'react';
import { Checkbox, Flex, Stack, Text } from '@chakra-ui/react';
import CartItem from '../cart/CartItem';

const CheckoutProducts = ({ cartData, checkedItems, handleCheckedItem, handleDeleteCartItem }) => {
  return (
    <Flex
      fontFamily={"roboto"}
      flexDir={"column"}
      alignItems={"center"}
      w={{ base: "100%", lg: "544px" }}
      gap={"16px"}
      p={{ base: "30px 10px", lg: "40px 20px 80px" }}
      mx={{ base: "16px", lg: "0px" }}
      boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
      borderRadius={"10px"}
      height={"max-content"}
    >
      <Text
        fontWeight={"600"}
        fontSize={"18px"}
        lineHeight={"25.2px"}
        color={"#000"}
      >
        Товары
      </Text>

      {cartData?.length ? (
        <Stack w={"100%"} direction={"column"} gap={"16px"}>
          {cartData?.map((item) => (
            <Checkbox
              colorScheme={"red"}
              key={item.id}
              isChecked={!!checkedItems.find(checkedItem => checkedItem.id === item.id && checkedItem.to_purchase)}
              onChange={() => handleCheckedItem(item.id)}
              pos={"relative"}
              size={"lg"}
              width={"100%"}
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "0",
                right: "0",
                width: "auto",
                height: "1px",
                background: "rgba(232, 236, 239, 1)",
              }}
            >
              <CartItem
                handleDeleteCartItem={handleDeleteCartItem}
                item={item}
                border={false}
              />
            </Checkbox>
          ))}
        </Stack>
      ) : (
        <Text>Корзина пуста</Text>
      )}
    </Flex>
  );
};

export default CheckoutProducts;
