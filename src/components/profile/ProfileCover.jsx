"use client";

import { usePathname } from "next/navigation";
import { Flex, useMediaQuery, Container } from "@chakra-ui/react";
import ProfileNav from "./ProfileNav";
import ProfileLayoutHeader from "./ProfileLayoutHeader";

const ProfileCover = ({ children, data }) => {
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const path = usePathname();

  return (
    <Container
      maxW={{ base: "1200px", xl: "1472px" }}
      px={"0px"}
      pt={{ base: "0px", lg: "30px" }}
    >
      <Flex
        flexDir={{
          base:"column",
          lg: "row",
        }}
        w={"100%"}
        gap={{ base: "0px", lg: "30px" }}
      >
        {path.includes("/profile") && isMobile ? (
          <ProfileLayoutHeader />
        ) : (
          <ProfileNav data={data} />
        )}

        <Flex width={'100%'} flexGrow={1}>{children}</Flex>
      </Flex>
    </Container>
  );
};

export default ProfileCover;
