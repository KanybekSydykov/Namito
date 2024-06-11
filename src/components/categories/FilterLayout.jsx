"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filters from "@/components/filters/Filters";
import { Box, Flex } from "@chakra-ui/react";
import Sort from "@/components/sorting/Sort";
import SubCategoriesList from "./SubCategoriesList";

const FilterLayout = ({ data,handleFilters,handlePrice,handleRating,handleSorting }) => {
  
  return (


      <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        width={{ base: "100%", lg: "auto" }}
        gap={"30px"}
      >
        <Filters
          data={data}
          handleFilters={handleFilters}
          handlePrice={handlePrice}
          handleRating={handleRating}
        />
        <Box display={{ base: "block", lg: "none" }}>
          <Sort handleSorting={handleSorting} />
        </Box>

      </Flex>

  );
};

export default FilterLayout;