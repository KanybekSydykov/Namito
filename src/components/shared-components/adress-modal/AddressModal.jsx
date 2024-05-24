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
} from "@chakra-ui/react";
import React from "react";
import FormInput from "../form-control/FormInput";

export default function AdressModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              Добавить новый адрес
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
                    <FormInput title={'Город'} type={'text'} required />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormInput title={'Улица'} type={'text'} required />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Квартира/Дом'} type={'number'} required />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Подъезд'} type={'number'} />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Этаж'} type={'number'} />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormInput title={'Домофон'} type={'number'} />
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
              onClick={onClose}
            >
              Сохранить
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
              Отменить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
