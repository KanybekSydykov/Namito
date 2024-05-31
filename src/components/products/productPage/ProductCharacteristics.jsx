import React from 'react'
import {   Box,
    Flex,
    Text,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    List,
    ListItem} from '@chakra-ui/react'

const ProductCharacteristics = ({data ,params}) => {

  if(data.length === 0){
    return null;
  }

  return (
    <Accordion
    defaultIndex={[0]}
    mt={"51px"}
    allowMultiple
    border={"none"}
  >
    <AccordionItem border={"none"}>
      <h2>
        <AccordionButton
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          px={0}
          width={"auto"}
        >
          <Box
            as="span"
            flex="1"
            textAlign="left"
            fontFamily={"roboto"}
            fontSize={{ base: "16px", lg: "18px" }}
            lineHeight={"22px"}
            fontWeight={"700"}
          >
        {params.locale === 'ru' ? 'Все характеристики' : 'All characteristics'}
          </Box>
          <AccordionIcon width={"22px"} h={"22px"} ms={"6px"} />
        </AccordionButton>
      </h2>
      <AccordionPanel mt={"14px"} px={0}>
        <List
          fontFamily={"roboto"}
          fontSize={"16px"}
          lineHeight={"24px"}
        >
            {
                data.map((item) => (
          <ListItem
            key={item.key}
            display={"flex"}
            flexDir={{base:"column",lg:'row'}}
            gap={"20px"}
            borderBottom={"1px solid rgba(237, 237, 237, 1)"}
            pt={"16px"}
            pb={"16px"}
            justifyContent={{base:'unset',lg:'space-between'}}

          >
            <Text w={{base:'auto',lg:'50%'}} fontWeight={"300"}>{item.key}</Text>
            <Text w={{base:'auto',lg:'50%'}} fontWeight={"400"}>{item.value}</Text>
          </ListItem>
                    
                ))
            }
        </List>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
  )
}

export default ProductCharacteristics