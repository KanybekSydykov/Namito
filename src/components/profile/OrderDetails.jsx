
import { Box, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderDetails = ({ params, searchParams, data = undefined }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Using Intl.DateTimeFormat to format the date based on locale
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat(params.locale, options).format(date);
  }

  const getOrderStatusName = (status) => {
    switch (status) {
      case 0:
        return params.locale === 'ru' ? "В процессе" : "In process";
      case 1:
        return params.locale === 'ru' ? "Доставлено" : "Delivered";
      case 2:
        return  params.locale === 'ru' ? "Отменен" : "Canceled";
      case 3:
        return  params.locale === 'ru' ? "Отправлено" : "Sent";
    }
  }

  console.log(data);

  const getAdressString = (item) => {
    return `${item.city}, ул. ${item.street} , кв. ${item.apartment_number}, ${
      item.entrance ? ` подъезд ${item.entrance}` : ""
    }, ${item.flooer ? `этаж ${item.floor}` : ""} , ${
      item.intercom ? `домофон ${item.intercom}` : ""
    } `;
  };


  if(!data){
    return <Flex
     width={'100%'}
     height={'100%'}
     justifyContent={'center'}
     alignItems={'center'}
     >
      <Spinner size='xl' color="orange" />
    </Flex>
  }

  return (
    <Container maxW={"unset"} px={{ base: "16px", lg: "0px" }} mx={'16px'}>
      <Flex
        fontFamily={"roboto"}
        fontSize={"18px"}
        lineHeight={"24px"}
        flexGrow={1}
        flexDir={"column"}
        gap={"26px"}
        py={{ base: "16px", lg: "40px" }}
        bg={"#fff"}
        position={"relative"}
        px={{ base: "10px", lg: "30px" }}
        borderRadius={"10px"}
        boxShadow={{
          base: "unset",
          lg: "0 0 4px 1px rgba(151, 151, 151, 0.25)",
        }}
        _after={{
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "16px",
          right: "16px",
          width: "calc(100% - 32px)",
          height: "1px",
          background: "rgba(232, 236, 239, 1)",
        }}
      >
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
           {params.locale === 'ru' ? 'Номер заказа' : 'Order number'}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {data.order_number ? data.order_number : data.id}
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
           {params.locale === 'ru' ? "Дата заказа" : "Order date"}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {formatDate(data.created_at)}
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
          {params.locale === 'ru' ? "Статус заказа" : "Order status"}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {getOrderStatusName(data.status)}
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
           {params.locale === 'ru' ? "Общая цена" : "Total price"}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {data.total_amount} {params.locale === 'ru' ? "сом" : "kgs"}
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
           {params.locale === 'ru' ? "Адрес доставки" : "Delivery address"}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {getAdressString(data.user_address)}
          </Text>
        </Flex>

        <Flex flexDir={"column"} w={'100%'} gap={""}>
          <Text fontWeight={"700"} fontSize={"22px"}>
           {params.locale === 'ru' ? "Товары :" : "Products :"}
          </Text>
          {data?.items.map((item, index) => (
            <Flex
              fontFamily={"roboto"}
              key={item.id}
              flexDir={{ base: "column", lg: "row" }}
              gap={"20px"}
              pos={"relative"}
              py={"16px"}
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "16px",
                right: "16px",
                width: "calc(100% - 32px)",
                height: "1px",
                background: "rgba(232, 236, 239, 1)",
              }}
            >
              <Flex flexDir={"column"} gap={"16px"}>
                <Box
                  width={"150px"}
                  h={"170px"}
                  borderRadius={"10px"}
                  boxShadow={"0 0 1px 0 rgba(135, 135, 135, 0.25)"}
                  pos={"relative"}
                  overflow={"hidden"}
                >
                  <Image
                    src={item.product_image ? item.product_image : "/product.png"}
                    width={150}
                    height={170}
                    alt={"product"}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              </Flex>
              <Flex flexDir={"column"} flexGrow={{base:0,lg:1}} gap={"16px"}>
                <Text
                  noOfLines={2}
                  textOverflow={"ellipsis"}
                  whiteSpace={"pre-line"}
                  fontWeight={"400"}
                >
                  {item.product_name}
                </Text>
                <Flex flexDir={"row"} gap={"14px"}>
                  <Text width={{base:"105px",lg:'220px'}}>
                  {params.locale === 'ru' ? "Цена за товар" : "Product price"}  
                    </Text>
                  <Text fontWeight={"700"}>
                    {item.product_variant.discounted_price
                      ? item.product_variant.discounted_price
                      : item.product_variant.price}
                  </Text>
                </Flex>
                <Flex flexDir={"row"} gap={"14px"}>
                  <Text width={{base:"105px",lg:'220px'}}>
                   {params.locale === 'ru' ? "Размер" : "Size"}
                    </Text>
                  <Text fontWeight={"700"}>{
                    item.product_variant.size.name
                  }</Text>
                </Flex>
                <Flex flexDir={"row"} gap={"14px"}>
                  <Text width={{base:"105px",lg:'220px'}}>
                    
                   {params.locale === 'ru' ? "Цвет" : "Color"}
                    
                    </Text>
                  <Text
                    fontWeight={"700"}
                    pos={"relative"}
                    _after={{
                      content: '""',
                      position: "absolute",
                      top: "calc(50% - 5px)",
                      right: "-20px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: item.product_variant.color.color,
                    }}
                  >
                    {item.product_variant.color.name}{" "}
                  </Text>
                </Flex>
              </Flex>
              <Link href={`/${params.locale}/product/${item.product_id}`} style={{
                position: "absolute",
                top:'0',
                left:'0',
                width:'100%',
                height:'100%'

              }} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default OrderDetails;
