import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const OrderDetails = ({ params,searchParams }) => {

  const {id} = searchParams;

  return (
    <Container maxW={"900px"} px={{ base: "16px", lg: "0px" }}>
      <Flex
        fontFamily={"roboto"}
        fontSize={"18px"}
        lineHeight={"24px"}
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
            Номер заказа
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            {id}
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
            Дата заказа
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            Октябрь 17, 2023
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
            Статус заказа
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            В процессе
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
            Общая цена
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            1234 сом
          </Text>
        </Flex>
        <Flex flexDir={{ base: "column", lg: "row" }} gap={"16px"}>
          <Text w={"50%"} fontWeight={"300"}>
            Адрес доставки
          </Text>
          <Text w={"50%"} fontWeight={"400"}>
            Бишкек, улица Абдрахманова 1/1
          </Text>
        </Flex>

        <Flex flexDir={"column"} gap={""} >
          <Text fontWeight={"700"} fontSize={"22px"}>
            Товары :
          </Text>
          <Flex
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
                  src={"/product.png"}
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
            <Flex flexDir={"column"} gap={"16px"}>
              <Text
                noOfLines={2}
                textOverflow={"ellipsis"}
                whiteSpace={"pre-line"}
                fontWeight={"400"}
              >
                Шоссейный велосипед Missile Шоссейный велосипед Missile
                Шоссейный велосипед Missile
              </Text>
              <Flex flexDir={"row"} gap={"14px"}>
                <Text width={"105px"}>Цена за товар</Text>
                <Text fontWeight={"700"}>40 000 сом</Text>
              </Flex>
              <Flex flexDir={"row"} gap={"14px"}>
                <Text width={"105px"}>Размер</Text>
                <Text fontWeight={"700"}>25 / S</Text>
              </Flex>
              <Flex flexDir={"row"} gap={"14px"}>
                <Text width={"105px"}>Цвет</Text>
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
                    background: "rgba(10, 180, 222, 1)",
                  }}
                >
                  Синий{" "}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
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
                  src={"/product.png"}
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
            <Flex flexDir={"column"} gap={"16px"}>
              <Text
                noOfLines={2}
                textOverflow={"ellipsis"}
                whiteSpace={"pre-line"}
                fontWeight={"400"}
              >
                Шоссейный велосипед Missile Шоссейный велосипед Missile
                Шоссейный велосипед Missile
              </Text>
              <Flex flexDir={"row"} gap={"14px"}>
                <Text width={"105px"}>Цена за товар</Text>
                <Text fontWeight={"700"}>40 000 сом</Text>
              </Flex>
              <Flex flexDir={"row"} gap={"14px"}>
                <Text width={"105px"}>Размер</Text>
                <Text fontWeight={"700"}>25 / S</Text>
              </Flex>
              <Flex flexDir={"row"} gap={"14px"}>
                <Text width={"105px"}>Цвет</Text>
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
                    background: "rgba(10, 180, 222, 1)",
                  }}
                >
                  Синий{" "}
                </Text>
              </Flex>
            </Flex>
          </Flex>
 
        </Flex>
      </Flex>
    </Container>
  );
};

export default OrderDetails;
