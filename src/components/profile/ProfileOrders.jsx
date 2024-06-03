'use client';
import { ENDPOINTS } from "@/API/endpoints";
import { getData } from "@/lib/apiServices";
import { Flex, Text,useMediaQuery,Box, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import Image from "next/image";

const ProfileOrders = ({ params,token }) => {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const [orders,SetOrders] = useState([]);
  const [requesting,SetRequesting] = useState(true);

  useEffect(() => {

    async function getOrders(){

      SetRequesting(true);
      try{
        const response = await getData(token,ENDPOINTS.getUserOrders(),params.locale);
        if(response.status >= 200){
          SetRequesting(false);
          SetOrders(response.data);
        } else {
          SetOrders([]);
          SetRequesting(false);
        }
      }
      catch(error){
        SetOrders([]);
        SetRequesting(false);
      }
 
    }

    if(token){
      getOrders();
    }
  }, [token]);

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


  if(requesting){
    return <Flex
     width={'100%'}
     height={'100%'}
     justifyContent={'center'}
     alignItems={'center'}
     >
      <Spinner size='xl' color="orange" />
    </Flex>
  }

function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Using Intl.DateTimeFormat to format the date based on locale
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat(params.locale, options).format(date);
  }

  if(!isDesktop && !orders.length){
    return    <Flex flexDir={"column"} gap={"24px"} px={{base:"16px",lg:'150px'}} py={'50px'} w={"100%"}>
    <Flex
      fontFamily={"roboto"}
      fontSize={"16px"}
      lineHeight={"24px"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"20px"}
      textAlign={"center"}
      position={'relative'}
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
       {params.locale === 'ru' ? "У вас нет заказов" : "You have no orders"}
      </Text>
        <Flex
        display={'inline-flex'}
        w={"32px"}
        h={"32px"}
        borderRadius={"10px"}
        bg={"rgba(255, 255, 255, 1)"}
        justifyContent={'center'}
        alignItems={'center'}
        boxShadow={
          "0 0 4px 1px rgba(151, 151, 151, 0.25)"}
      >
        <Image
          src={"/fav-icon.svg"}
          alt={"heart"}
          width={20}
          height={20}
        />
      </Flex>


    </Flex>
  </Flex>
  }
  
  const mobileOrders = (
   <>
   { orders.map((order)=>(

   <Link href={`/${params.locale}/profile/order?id=${order.id}`} key={order.id}>
     <Flex
       fontFamily={"roboto"}
       fontSize={"16px"}
       lineHeight={"24px"}
       flexDir={"column"}
       gap={"22px"}
       py={"16px"}
       bg={"#fff"}
       _hover={{
         bg: "rgba(232, 236, 239, 1)",
       }}
       position={"relative"}
       px={"16px"}
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
       <Flex flexDir={"row"}>
         <Text w={"50%"} fontWeight={"300"}>
         {params.locale === 'ru' ? "Номер заказа" : "Order number"}  
         </Text>
         <Text w={"50%"} fontWeight={"400"}>
           {order.order_number}
         </Text>
       </Flex>
       <Flex flexDir={"row"}>
         <Text w={"50%"} fontWeight={"300"}>
        {params.locale === 'ru' ? "Дата заказа" : "Order date"}  
         </Text>
         <Text w={"50%"} fontWeight={"400"}>
           {formatDate(order.created_at)}
         </Text>
       </Flex>
       <Flex flexDir={"row"}>
         <Text w={"50%"} fontWeight={"300"}>
          {params.locale === 'ru' ? "Статус заказа" : "Order status"}
         </Text>
         <Text w={"50%"} fontWeight={"400"}>
          {getOrderStatusName(order.status)}
         </Text>
       </Flex>
       <Flex flexDir={"row"}>
         <Text w={"50%"} fontWeight={"300"}>
          {params.locale === 'ru' ? "Общая цена" : "Total price"}
         </Text>
         <Text w={"50%"} fontWeight={"400"}>
          {order.total_amount} сом
         </Text>
       </Flex>
     </Flex>
   </Link>
   ))
   
   }
   
   </>
  );

  const desktopOrders = (
  <>  {orders.length ? 
    <Flex
      fontFamily={"roboto"}
      fontSize={"16px"}
      lineHeight={"24px"}
      flexDir={"column"}
      py={"16px"}
      bg={"#fff"}
      position={"relative"}
      px={"16px"}
      w={"100%"}
    >
      <Flex flexDir={"row"} ps={"5px"} mb={'20px'}>
        <Text w={"50%"} fontWeight={"300"}>
         {params.locale === 'ru' ? "Номер заказа" : "Order number"} 
        </Text>

        <Text w={"50%"} fontWeight={"300"}>
         {params.locale === 'ru' ? "Дата заказа" : "Order date"} 
        </Text>

        <Text w={"50%"} fontWeight={"300"}>
         {params.locale === 'ru' ? "Статус заказа" : "Order status"} 
        </Text>

        <Text w={"50%"} fontWeight={"300"}>
         {params.locale === 'ru' ? "Общая цена" : "Total price"}
        </Text>
      </Flex>


   {  orders.map((order) => (
     <Link href={`/${params.locale}/profile/order?id=${order.id}`} key={order.id}>
        <Flex
          flexDir={"row"}
          bg={"#fff"}
          _hover={{
            bg: "rgba(232, 236, 239, 1)",
          }}
          py={"8px"}
          ps={"5px"}
          borderRadius={"10px"}
          pos={"relative"}
          _after={{
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "8px",
            right: "8px",
            width: "auto",
            height: "1px",
            background: "rgba(232, 236, 239, 1)",
          }}
        >
          <Text w={"50%"} fontWeight={"400"}>
           {order.order_number}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {formatDate(order.created_at)}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
           {getOrderStatusName(order.status)}
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
           {order.total_amount}{" "}сом
          </Text>
        </Flex>
      </Link>
   ))}
      

    </Flex>
    :
    <Flex flexDir={"column"} gap={"24px"} px={{base:"16px",lg:'150px'}} py={'50px'} w={"100%"}>
    <Flex
      fontFamily={"roboto"}
      fontSize={"16px"}
      lineHeight={"24px"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"20px"}
      textAlign={"center"}
      position={'relative'}
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
        Вы ещё не оформили ни один заказ
      </Text>
        <Flex
        display={'inline-flex'}
        w={"32px"}
        h={"32px"}
        borderRadius={"10px"}
        bg={"rgba(255, 255, 255, 1)"}
        justifyContent={'center'}
        alignItems={'center'}
        boxShadow={
          "0 0 4px 1px rgba(151, 151, 151, 0.25)"}
      >
        <Image
          src={"/fav-icon.svg"}
          alt={"heart"}
          width={20}
          height={20}
        />
      </Flex>


    </Flex>
  </Flex>
 }
  </>);

  return (
    <Flex flexDir={"column"} pb={"30px"} w={'100%'} minW={{base:'100%',lg:'500px'}}>
      {isDesktop ? desktopOrders : mobileOrders}
    </Flex>
  );
};

export default ProfileOrders;
