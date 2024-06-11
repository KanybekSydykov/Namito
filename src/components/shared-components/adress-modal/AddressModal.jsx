"use client";

import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FormInput from "../form-control/FormInput";
import { useParams } from "next/navigation";

export default function AdressModal({ children,handleAddAdress ,data,isEdit,handleEditAdress }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [city, setCity] = useState(isEdit ? data.city : "");
  const [street, setStreet] = useState( isEdit ? data.street : "");
  const [apartment_number, setApartment] = useState( isEdit ? data.apartment_number : "");
  const [entrance, setEntrance] = useState(isEdit ? data.entrance : "");
  const [floor, setFloor] = useState(isEdit ? data.floor : "");
  const [intercom, setIntercom] = useState( isEdit ? data.intercom : "");
  const params = useParams();


  useEffect(() => {

   if(!isEdit){ setApartment("");
    setCity("");
    setEntrance("");
    setFloor("");
    setIntercom("");
    setStreet("");}
  }, [isOpen]);


  function handleSaveAdress () {
   const credentials = {
   city,
   street,
   apartment_number,
   entrance,
   floor,
   intercom,
    "is_primary": true
   }
   handleAddAdress(credentials)
   onClose()
 
  }

  function editAdress() {
    const credentials = {};
    if (city !== data.city) credentials.city = city;
    if (street !== data.street) credentials.street = street;
    if (apartment_number !== data.apartment_number) credentials.apartment_number = apartment_number;
    if (entrance !== data.entrance) credentials.entrance = entrance;
    if (floor !== data.floor) credentials.floor = floor;
    if (intercom !== data.intercom) credentials.intercom = intercom;

    // Call a function to handle the edited address
    handleEditAdress(credentials,data.id);
    onClose();
  }


  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"} >
        <ModalOverlay />
        <ModalContent fontFamily={"roboto"}>
          <ModalHeader>
            <Text
              fontWeight={"700"}
              fontSize={"16px"}
              lineHeight={"22px"}
              color={"rgba(54, 54, 54, 1)"}
            >
              {params.locale === 'ru' ? "Добавить новый адрес" : "Add new address"}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
            gridTemplateColumns={'repeat(2, minmax(0,1fr))'}
            rowGap={'20px'}
            columnGap={'16px'}
            >
                <GridItem colSpan={2}>
                    <FormInput title={'Город'} title_en={'City'} value={city} setValue={setCity}  type={'text'} required />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormInput title={'Улица'} title_en={'Street'} value={street} setValue={setStreet} type={'text'} required />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Квартира/Дом'} title_en={'Apartment number'} value={apartment_number} setValue={setApartment} type={'number'} required />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Подъезд'} title_en={'Entrance'} value={entrance} setValue={setEntrance} type={'number'} />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Этаж'} title_en={'Floor'} value={floor} setValue={setFloor} type={'number'} />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Домофон'} title_en={'Intercom'} value={intercom} setValue={setIntercom} type={'number'} />
                </GridItem>
            </Grid>
         

          </ModalBody>

          <ModalFooter
            flexDir={"column"}
            gap={"20px"}
            fontWeight={"400"}
            lineHeight={"22px"}
            color={"#fff"}
            mt={'50px'}
          >
            <Button
              width={"100%"}
              h={"50px"}
              borderRadius={"10px"}
              bg={"rgba(203, 70, 9, .75)"}
              fontSize={"18px"}
              _hover={{
                bg: "rgba(203, 70, 9, 1)",
              }}
              color={"#fff"}
              onClick={isEdit ? editAdress : handleSaveAdress}
            >
              {params.locale === 'ru' ? 'Сохранить' : 'Save'}
            </Button>
            <Button
              width={"100%"}
              h={"50px"}
              color={"rgba(203, 70, 9, 1)"}
              border={"1px solid rgba(203, 70, 9, 1)"}
              borderRadius={"10px"}
              bg={"#fff"}
              onClick={onClose}
            >
              {params.locale === 'ru' ? 'Отменить' : 'Cancel'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
