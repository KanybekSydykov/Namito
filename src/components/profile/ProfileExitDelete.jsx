"use client";

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileExitDelete({ children, isDelete = false }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale } = useParams();
  const router = useRouter();
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={"auto 16px"} py={'35px'} fontFamily={"roboto"}>
          <ModalHeader
            textAlign={"center"}
            fontSize={"20px"}
            fontWeight={"600"}
            lineHeight={"28px"}
            color={"#000"}
          >
            {locale === "ru" ? "Внимание" : "Attention"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            gap={"16px"}
            justifyContent={"center"}
            alignItems={"center"}
            px={"50px"}
          >
            <Text
              fontSize={"16px"}
              fontWeight={"400"}
              lineHeight={"24px"}
              color={"rgba(160, 160, 160, 1)"}
              textAlign={"center"}
            >
              {isDelete
                ? "При удалении аккаунта, Вы навсегда потеряете данные о Ваших заказах."
                : "Вы действительно хотите выйти из аккаунта?"}
            </Text>

            
            
            <Button as={Link}
              href={`/${locale}/logout`}
              mt={"8px"}
              width={"100%"}
              maxW={{ base: "257px", lg: "355px" }}
              textAlign={"center"}
              py={"15px"}
              borderRadius={"10px"}
              bg={"rgb(213 7 7 / 80%)"}
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
              _hover={{
                bg: "rgb(213 7 7 / 100%)",
              }}
            >
              <Text>{isDelete ? "Удалить аккаунт" : "Выйти из аккаунта"}</Text>
            </Button>

            <Button
              width={"100%"}
              maxW={{ base: "257px", lg: "355px" }}
              textAlign={"center"}
              py={"15px"}
              borderRadius={"10px"}
              bg={"transparent"}
              fontSize={"18px"}
              lineHeight={"25px"}
              fontWeight={"400"}
              border={"1px solid rgba(203, 70, 9, 1)"}
              color={"rgba(203, 70, 9, 1)"}
              h={"auto"}
              onClick={onClose}
              _hover={{
                bg: "rgba(203, 70, 9, 1)",
                color: "#fff",
              }}
            >
              {locale === "ru" ? "Отменить" : "Cancel"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
