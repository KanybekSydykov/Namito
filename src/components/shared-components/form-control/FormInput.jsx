"use client";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
export default function FormInput({ title, type, required }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  return (
    <FormControl fontFamily={'roboto'} isRequired={required}>
      <FormLabel 
      fontWeight={'300'}
      fontSize={'16px'}
      lineHeight={'24px'}
      color={'rgba(54, 54, 54, 1)'}
      >{title}</FormLabel>
      <Input
        type={type}
        value={input}
        onChange={handleInputChange}
        placeholder={title}
        border={'1px solid rgba(160, 160, 160, 1)'}
        borderRadius={'10px'}
        h={'56px'}
        _placeholder={{
            color:'rgba(160, 160, 160, 1)'
        }}
        _focus={{
            borderColor:'rgba(203, 70, 9, .5)',
            boxShadow:'0 0 0 1px rgba(203, 70, 9, .25)'
        }}
      />
      {isError && (
        <FormErrorMessage
        fontWeight={'400'}
        fontSize={'12px'}
        >{title} обязательное поле.</FormErrorMessage>
      )}
    </FormControl>
  );
}
