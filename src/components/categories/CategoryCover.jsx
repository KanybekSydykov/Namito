"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import ProdList from "@/components/products/product-list/ProdList";
import { useSearchParams } from "next/navigation";

const CategoryCover = ({ data, params, token, filteredProductsData = undefined,loading }) => {
  const [currentProducts, setCurrentProducts] = useState([]);
  const searchParams = useSearchParams();
  // const [filteredProducts, setFilteredProducts] = useState(filteredProductsData.products);

  console.log(filteredProductsData);
  
  useEffect(() => {
    if (filteredProductsData && filteredProductsData.length > 0) {
      setCurrentProducts(() => [...filteredProductsData]);
    } else {
      setCurrentProducts(() => [...data.products]);
    }
  }, [filteredProductsData?.length,searchParams]);

  console.log(currentProducts);

  return (
    <Box position={"relative"} width={"100%"}>
      <ProdList token={token} data={currentProducts} locale={params.locale} />
    </Box>
  );
};

export default CategoryCover;
