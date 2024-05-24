import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import AdressModal from "../shared-components/adress-modal/AddressModal";

const ProfileAdresses = () => {
  return (
    <Flex flexDir={"column"} gap={"16px"} fontFamily={"roboto"} w={"100%"} pb={'30px'}>
      <Flex
        flexDir={"row"}
        px={"16px"}
        gap={"48px"}
        py={"16px"}
        alignItems={"center"}
        bg={"rgba(241, 241, 241, 1)"}
      >
        <Text
          fontWeight={"400"}
          fontSize={"18px"}
          lineHeight={"25px"}
          width={"100%"}
          maxW={"252px"}
        >
          Бишкек, ул. Абдрахманова 1/1, кв. 12, подъезд 1
        </Text>
        <Flex
          width={"auto"}
          flexGrow={1}
          flexDir={"row"}
          justifyContent={"flex-end"}
          gap={"10px"}
          alignItems={"center"}
        >
          <Image src={"/check-icon.svg"} width={24} height={24} />

          <Flex
            w={"24px"}
            h={"24px"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => console.log("edit clicked")}
          >
            <Image src={"/dots-icon.svg"} width={24} height={24} />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir={"row"}
        px={"16px"}
        gap={"48px"}
        py={"16px"}
        alignItems={"center"}
        bg={"rgba(241, 241, 241, 1)"}
      >
        <Text
          fontWeight={"400"}
          fontSize={"18px"}
          lineHeight={"25px"}
          width={"100%"}
          maxW={"252px"}
        >
          Бишкек, ул. Абдрахманова 1/1, кв. 12, подъезд 1
        </Text>
        <Flex
          width={"auto"}
          flexGrow={1}
          flexDir={"row"}
          justifyContent={"flex-end"}
          gap={"10px"}
          alignItems={"center"}
        >
          <Flex
            w={"24px"}
            h={"24px"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => console.log("edit clicked")}
          >
            <Image src={"/dots-icon.svg"} width={24} height={24} />
          </Flex>
        </Flex>
      </Flex>
      <AdressModal>
              <Button
                bg={"#fff"}
                border={"1px solid rgba(160, 160, 160, 1)"}
                borderRadius={"10px"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                minW={"338px"}
                maxW={"380px"}
                py={"8px"}
                h={"auto"}
                role="group"
                mx={'auto'}
                transition={"all .3s ease"}
                _hover={{
                  bg: "orange",
                  borderColor: "orange",
                }}
              >
                <Flex
                  w={"24px"}
                  h={"24px"}
                  filter={"grayscale(100%)"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _groupHover={{ filter: "brightness(0) invert(1)" }}
                >
                  <Image src={"/plus-icon.svg"} width={14} height={14} 
                  style={{
                    transition:'all .3s ease'
                  }}
                  />
                </Flex>
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"300"}
                  fontSize={"18px"}
                  lineHeight={"27px"}
                  color={"rgba(54, 54, 54, 1)"}
                  transition={"all .3s ease"}
                  _groupHover={{
                    color: "#fff",
                  }}
                >
                  Добавить адрес
                </Text>
              </Button>
            </AdressModal>
    </Flex>
  );
};

export default ProfileAdresses;
