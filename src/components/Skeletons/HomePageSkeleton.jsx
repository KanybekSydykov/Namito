import { Container, Flex, Skeleton, Grid } from "@chakra-ui/react";

const HomePageSkeleton = () => {
  return (
    <Container
      maxW={{ base: "1200px", xl: "1472px" }}
      display={"flex"}
      flexDir={"column"}
      gap={"100px"}
      mt={"50px"}
    >
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
      >
        <Flex>
          <Skeleton
            fadeDuration={1}
            startColor="pink.500"
            endColor="orange.500"
            height="460px"
            width={"470px"}
          />
        </Flex>
        <Flex flexDir={"row"} gap={"30px"}>
          <Flex
            flexDir={"column"}
            w={{ base: "116px", lg: "140px", xl: "190px", "2xl": "205px" }}
            gap={"30px"}
          >
            <Skeleton
              fadeDuration={1}
              startColor="pink.500"
              endColor="orange.500"
              height={"100%"}
              aspectRatio={116 / 142}
              w={"100%"}
              borderRadius={"10px"}
            />
            <Skeleton
              fadeDuration={1}
              startColor="pink.500"
              endColor="orange.500"
              height={"100%"}
              w={"100%"}
              aspectRatio={116 / 142}
              borderRadius={"10px"}
            />
          </Flex>
          <Skeleton
            fadeDuration={1}
            startColor="pink.500"
            endColor="orange.500"
            flexGrow={1}
            w={{ base: "218px", lg: "270px", xl: "350px" }}
            aspectRatio={218 / 299}
            h={"100%"}
            borderRadius={"10px"}
          />
        </Flex>
      </Flex>

      <Skeleton
        fadeDuration={1}
        startColor="pink.500"
        borderRadius={"10px"}
        endColor="orange.500"
        height="300px"
      />

      <Flex flexDir={"column"} gap={"30px"}>
        <Skeleton
          startColor="pink.500"
          endColor="orange.500"
          w={"304px"}
          h={"44px"}
        />

        <Grid
          gap={{ base: "16px", xl: "30px" }}
          overflowX={"auto"}
          py={"4px"}
          px={"16px"}
          gridTemplateColumns={{
            base: "repeat(2, minmax(171px,1fr))",
            md: "repeat(3, minmax(171px,1fr))",
            lg: "repeat(4, minmax(227px,1fr))",
            xl: "repeat(5, minmax(227px,1fr))",
          }}
        >
          {[0, 1, 2, 3, 4].map((item, index) => (
            <Skeleton
              fadeDuration={1}
              key={index}
              startColor="pink.500"
              endColor="orange.500"
              height={"549px"}
              borderRadius={"10px"}
            />
          ))}
        </Grid>
      </Flex>
      <Flex flexDir={"column"} gap={"30px"}>
        <Skeleton
          fadeDuration={1}
          startColor="pink.500"
          endColor="orange.500"
          w={"304px"}
          h={"44px"}
        />

        <Grid
          gap={{ base: "16px", xl: "30px" }}
          overflowX={"auto"}
          py={"4px"}
          px={"16px"}
          gridTemplateColumns={{
            base: "repeat(2, minmax(171px,1fr))",
            md: "repeat(3, minmax(171px,1fr))",
            lg: "repeat(4, minmax(227px,1fr))",
            xl: "repeat(5, minmax(227px,1fr))",
          }}
        >
          {[0, 1, 2, 3, 4].map((item, index) => (
            <Skeleton
              fadeDuration={1}
              key={index}
              startColor="pink.500"
              endColor="orange.500"
              height={"549px"}
              borderRadius={"10px"}
            />
          ))}
        </Grid>
      </Flex>
      <Flex flexDir={"column"} gap={"30px"}>
        <Skeleton
          fadeDuration={1}
          startColor="pink.500"
          endColor="orange.500"
          w={"304px"}
          h={"44px"}
        />

        <Grid
          gap={{ base: "16px", xl: "30px" }}
          overflowX={"auto"}
          py={"4px"}
          px={"16px"}
          gridTemplateColumns={{
            base: "repeat(2, minmax(171px,1fr))",
            md: "repeat(3, minmax(171px,1fr))",
            lg: "repeat(4, minmax(227px,1fr))",
            xl: "repeat(5, minmax(227px,1fr))",
          }}
        >
          {[0, 1, 2, 3, 4].map((item, index) => (
            <Skeleton
              fadeDuration={1}
              key={index}
              startColor="pink.500"
              endColor="orange.500"
              height={"549px"}
              borderRadius={"10px"}
            />
          ))}
        </Grid>
      </Flex>
    </Container>
  );
};

export default HomePageSkeleton;
