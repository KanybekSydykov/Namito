"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import ProfileSettings from "./ProfileSettings";
import { Container } from "@chakra-ui/react";
import ProfileOrders from "./ProfileOrders";
import ProfileReviews from "./ProfileReviews";
import ProfileFavourites from "./ProfileFavourites";
import ProfileAboutApp from "./ProfileAboutApp";
import ProfileLanguage from "./ProfileLanguage";
import ProfileAdresses from "./ProfileAdresses";

const ProfilePages = () => {
  const path = usePathname();
  const params = useParams();

  const page  = useSearchParams().get('page');

  console.log(page);

  return (
    <Container
      pt={"20px"}
      px={"unset"}
      w={{base:"100%",lg:'auto'}}
      minW={{base:'100%',lg:'420px'}}
      maxW={'1024px'}
      borderRadius={"10px"}
      boxShadow={{ base: "unset", lg: "0 0 4px 1px rgba(151, 151, 151, 0.25)" }}
      display={'flex'}
      justifyContent={'center'}
    >
      {page === "settings" && <ProfileSettings /> }
      {page === "orders" && <ProfileOrders params={params} />}
      {page === "reviews" && <ProfileReviews params={params} />}
      {page === "favourites" && <ProfileFavourites params={params} />}
      {page === "about" && <ProfileAboutApp params={params} />}
      {page === "delivery" && <ProfileAboutApp params={params} />}
      {page === "language" && <ProfileLanguage params={params} />}
      {page === "adresses" && <ProfileAdresses params={params} />}
    </Container>
  );
};

export default ProfilePages;
