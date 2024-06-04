"use client";
import React from "react";
import {
  Drawer,
  Box,
  DrawerBody,
  Text,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";

const ModalWindow = ({ ButtonEl, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ButtonEl onClick={onOpen} />
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent
      maxH={'90dvh'}
      mx={'10px'}
      w={'auto'}
      borderTopLeftRadius={'20px'}
      borderTopRightRadius={'20px'}
        >
          <DrawerHeader display={"flex"} justifyContent={"flex-end"}>
            <Button
              bg={"transparent"}
              onClick={onClose}
              ml={"auto"}
              _hover={{ background: "transparent" }}
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ boxShadow: "none" }}
              _active={{ background: "transparent" }}
            >
              <Image
                src={"/close-btn.svg"}
                width={32}
                height={32}
                alt="close"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
            </Button>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ModalWindow;
