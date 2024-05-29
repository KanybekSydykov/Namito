'use server'
import React from 'react'
import { Button,Text } from '@chakra-ui/react'
import {logout} from '@/lib/lib'
import {redirect} from 'next/navigation'

const Logout = async() => {
  return (
   <form
   action={async () => {
    "use server";
    await logout();
    redirect("/");
  }}
   >
         <Button
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
              // onClick={() => router.push(`/${locale}/logout`)}
            >
              <Text>{isDelete ? "Удалить аккаунт" : "Выйти из аккаунта"}</Text>
            </Button>
     </form>
  )
}

export default Logout