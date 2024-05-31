"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
import { Container, useMediaQuery } from "@chakra-ui/react";
import ProfileOrders from "./ProfileOrders";
import ProfileReviews from "./ProfileReviews";
import ProfileFavourites from "./ProfileFavourites";
import ProfileLanguage from "./ProfileLanguage";
import ProfileAdresses from "./ProfileAdresses";
import ProfileNav from "./ProfileNav";

const ProfilePages = ({ data, token }) => {
  const path = usePathname();
  const params = useParams();
  const page = useSearchParams().get("page");
  const router = useRouter();
  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  useEffect(() => {
    router.refresh()
  }, [page]);

  console.log(page);

  return (
    <Container
      py={{base:"20px",lg:'40px'}}
      px={"unset"}
      w={{ base: "100%", lg: "auto" }}
      minW={{ base: "100%", lg: "420px" }}
      maxW={"1024px"}
      borderRadius={"10px"}
      boxShadow={{ base: "unset", lg: "0 0 4px 1px rgba(151, 151, 151, 0.25)" }}
      display={"flex"}
      justifyContent={{base:"center",lg:'flex-start'}}
      me={'16px'}
    >
      {page === null && !isDesktop && <ProfileNav data={data} />}
      {page === "settings" && <ProfileSettings data={data} token={token} />}
      {page === "orders" && <ProfileOrders params={params} token={token} />}
      {page === "reviews" && <ProfileReviews params={params} token={token} />}
      {page === "favourites" && (
        <ProfileFavourites params={params} token={token} />
      )}
      {page === "language" && <ProfileLanguage params={params} />}
      {page === "adresses" && <ProfileAdresses params={params} token={token} />}
    </Container>
  );
};

export default ProfilePages;
