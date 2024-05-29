"use client";

import {
  Button,
  Flex,
  Spinner,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import AdressModal from "../shared-components/adress-modal/AddressModal";
import { deleteData, getData, patchData, postData } from "@/lib/apiServices";
import { ENDPOINTS } from "@/API/endpoints";

const ProfileAdresses = ({ params, token,handleSelectedAddress }) => {
  const [userAddresses, setUserAddresses] = useState(undefined);
  const [isRequestPending, setIsRequestPending] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function requestUserAdresses() {
      const response = await getData(token, ENDPOINTS.getUserAdresses());
      if (response.data.length) {
        setUserAddresses(response.data);
        setIsRequestPending(false);
        if(handleSelectedAddress){
          response.data.filter((address) => address.is_primary === true && handleSelectedAddress(address.id))
        }
      } else {
        setUserAddresses(false);
        setIsRequestPending(false);
      }
    }

    requestUserAdresses();
  }, []);

  async function handleAddAdress(payload) {
    const response = await postData(payload, token, ENDPOINTS.postAddAdress());

    if (response.status >= 200) {
      console.log("showing toast");
      toast({
        title: "Адрес добавлен успешно",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (userAddresses) {
        setUserAddresses((prev) => [...prev, response.data]);
      } else {
        setUserAddresses([response.data]);
      }
    }
  }

  async function handleEditAdress(payload, id) {
    const response = await patchData(payload, token, ENDPOINTS.patchAdress(id));

    if (response.status >= 200) {
      toast({
        title: "Адрес успешно изменён",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setUserAddresses((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    }
  }

  async function handleDeleteAddress(id) {
    const response = await deleteData(token, ENDPOINTS.deleteAdress(id));

    toast({
      title: "Адрес успешно удалён",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setUserAddresses((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSetPrimary(id) {
    if(handleSelectedAddress){handleSelectedAddress(id);}
    try {
      const currentPrimary = userAddresses.find(
        (address) => address.is_primary
      );

      if (currentPrimary?.id !== id) {
        // Patch current primary address to be non-primary
        if (currentPrimary) {
          await patchData(
            { is_primary: false },
            token,
            ENDPOINTS.patchAdress(currentPrimary.id)
          );
        }

        // Patch the selected address to be primary
        const response = await patchData(
          { is_primary: true },
          token,
          ENDPOINTS.patchAdress(id)
        );
        if (response.status >= 200) {
          toast({
            title: "Адрес успешно назначен основным",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          setUserAddresses((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, is_primary: true }
                : { ...item, is_primary: false }
            )
          );
        }
      }
    } catch (error) {
      toast({
        title: "Не удалось назначить адрес основным",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const getAdressString = (item) => {
    return `${item.city}, ул. ${item.street} , кв. ${item.apartment_number}, ${
      item.entrance ? ` подъезд ${item.entrance}` : ""
    }, ${item.flooer ? `этаж ${item.floor}` : ""} , ${
      item.intercom ? `домофон ${item.intercom}` : ""
    } `;
  };

  return (
    <Flex
      flexDir={"column"}
      gap={"16px"}
      fontFamily={"roboto"}
      w={"100%"}
      pb={"30px"}
    >
      {isRequestPending ? (
        <Spinner mx={"auto"} size="xl" color="orange" />
      ) : (
        <>
          <Flex
            flexDir={"column"}
            gap={"16px"}
            fontFamily={"roboto"}
            w={"100%"}
            pb={"30px"}
          >
            {userAddresses && userAddresses?.map((item, index) => (
              <Flex
                flexDir={"row"}
                px={"16px"}
                gap={"48px"}
                py={"16px"}
                alignItems={"center"}
                justifyContent={"space-between"}
                bg={"rgba(241, 241, 241, 1)"}
                key={index}
                _hover={{
                  bg:'orange',
                }}
                transition={"all 0.2s ease-in-out"}
                cursor={"pointer"}
                role="group"
                
              >
                <Flex
                  width={"auto"}
                  flexGrow={1}
                  flexDir={"row"}
                  justifyContent={"space-between"}
                  gap={"10px"}
                  alignItems={"center"}
                  onClick={() => handleSetPrimary(item.id)}
                >
                  <Text
                    fontWeight={"400"}
                    fontSize={"18px"}
                    lineHeight={"25px"}
                    width={"100%"}
                    maxW={{base:"252px",lg:'unset'}}
                    _groupHover={{
                      color: "white",
                    }}
                  >
                    {getAdressString(item)}
                  </Text>

                  {item.is_primary && (
                    <Box
                    _groupHover={{
                      filter: "brightness(0) invert(1) ",
                    }}
                    >
                      <Image
                        alt={"check"}
                        src={"/check-icon.svg"}
                        width={24}
                        height={24}
                      />
                    </Box>
                      
                  )}
                </Flex>

                <Flex
                  w={"24px"}
                  h={"24px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={() => console.log("edit clicked")}
                >
                  <Menu>
                    <MenuButton as={Button} w={"24px"} h={"24px"} p={0}>
                      <Image
                        alt={"edit"}
                        src={"/dots-icon.svg"}
                        width={24}
                        height={24}
                        style={{ margin: "0 auto" }}
                      />
                    </MenuButton>
                    <MenuList>
                      <AdressModal
                        isEdit={true}
                        data={item}
                        handleEditAdress={handleEditAdress}
                      >
                        <MenuItem>Изменить</MenuItem>
                      </AdressModal>
                      <MenuItem onClick={() => handleDeleteAddress(item.id)}>
                        Удалить
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
            ))}
          </Flex>

          {!userAddresses && (
            <Text
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"18px"}
              lineHeight={"25px"}
              color={"rgba(54, 54, 54, 1)"}
              textAlign={"center"}
            >
              У вас нет сохраненных адресов
            </Text>
          )}
        </>
      )}

      <AdressModal handleAddAdress={handleAddAdress}>
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
          mx={"auto"}
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
            <Image
              src={"/plus-icon.svg"}
              width={14}
              height={14}
              alt={"plus"}
              style={{
                transition: "all .3s ease",
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
