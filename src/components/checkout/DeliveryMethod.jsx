import React from 'react'
import { Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'

const DeliveryMethod = ({locale,deliveryValue,setDeliveryValue}) => {
  return (
    <Flex
    flexDir={"column"}
    gap={"30px"}
    p={"30px 10px"}
    mx={"16px"}
    boxShadow={"0 0 4px 0 rgba(151, 151, 151, 0.25)"}
    borderRadius={"10px"}
    alignItems={"center"}
  >
    <Text
      fontWeight={"600"}
      fontSize={"18px"}
      lineHeight={"25.2px"}
      color={"#000"}
    >
    {locale === 'ru' ? 'Способ доставки' : 'Delivery method'}
    </Text>

    <RadioGroup
      onChange={(value) => setDeliveryValue(value)}
      value={deliveryValue}
    >
      <Stack direction="row" gap={"30px"}>
        <Radio value="курьером" size={"lg"} colorScheme={"red"}>
          {locale === 'ru' ? 'Курьером' : 'Courier'}
        </Radio>
        <Radio value="самовывоз" size={"lg"} colorScheme={"red"}>
          {locale === 'ru' ? 'Самовывоз' : 'Pickup'}
        </Radio>
      </Stack>
    </RadioGroup>
  </Flex>
  )
}

export default DeliveryMethod