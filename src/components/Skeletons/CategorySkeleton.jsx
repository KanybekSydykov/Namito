import { Container, Flex, Skeleton, Grid } from "@chakra-ui/react";

const CategorySkeleton = () => {
  return (
    <Container
      maxW={{ base: "1200px", xl: "1472px" }}
      display={"flex"}
      flexDir={"column"}
      gap={"100px"}
      mt={"50px"}
    >
      <Grid
        gridTemplateColumns={{base:'repeat(1,minmax(0,1fr))',lg:'repeat(3,minmax(0,1fr))'}}
        gap={'30px'}
      >
        <Skeleton width={"100%"} borderRadius={'20px'} startColor="pink.500" endColor="orange.500" height={"500px"} />
        <Skeleton width={"100%"} borderRadius={'20px'} startColor="pink.500" endColor="orange.500" height={"500px"} />
        <Skeleton width={"100%"} borderRadius={'20px'} startColor="pink.500" endColor="orange.500" height={"500px"} />

        </Grid>
    </Container>
  );
};

export default CategorySkeleton;
