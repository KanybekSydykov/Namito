"use client";

import { usePathname } from "next/navigation";
import { Flex, useMediaQuery, Container } from "@chakra-ui/react";
import ProfileNav from "./ProfileNav";
import ProfileLayoutHeader from "./ProfileLayoutHeader";

const ProfileCover = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const path = usePathname();

  return (
    <Container maxW={{ base: "1200px", xl: "1472px" }} px={"0px"} pt={{base:'0px',lg:'30px'}}>
      <Flex
        flexDir={{
          base: path.endsWith("/profile") ? "row" : "column",
          lg: "row",
        }}
        w={"100%"}
        gap={{ base: "0px", lg: "30px" }}
      >
        {path.endsWith("/profile") ? (
          <ProfileNav />
        ) : isMobile ? (
          <ProfileLayoutHeader />
        ) : (
          <ProfileNav />
        )}

        <Flex >
          {children}
        </Flex>
      </Flex>
    </Container>
  );
};

export default ProfileCover;
