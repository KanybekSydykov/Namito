import React, { useState, useEffect, useRef } from "react";
import { CheckboxStyled } from "../ui/CheckBoxStyled";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useCheckboxGroup,
  Collapse,
  Button,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import RatingCheckbox from "./RatingRadioGroup";

const CheckBoxList = ({ title, getValues, data = null, isLast = false, isRating = false, isColor=false,...props }) => {
  const [show, setShow] = useState(false);

  // console.log(data);
  const handleToggle = () => setShow(!show);
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });
  const ref = useRef(null);
  const [collapseHeight, setCollapseHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setCollapseHeight(ref.current.clientHeight);
    }
  }, [ref.current]);

  // Use a debounce function to limit the rate of state updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getValues(title, value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  function getCollapseSize(length) {
    if (length === 5) {
      return 200;
    } else if (length > 5) {
      return 5 * 44;
    } else {
      return length * 44;
    }
  }

  return (
    <>
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem
          py={"20px"}
          borderTop={"none"}
          borderBottom={isLast ? "none" : "1px solid rgba(0,0,0,0.1)"}
        >
          <h2>
            <AccordionButton
              p={"0"}
              background={"transparent"}
              _hover={{ background: "transparent" }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontFamily={"roboto"}
                fontSize={"18px"}
                fontWeight={"600"}
                lineHeight={"25.2px"}
              >
                {title}
              </Box>
              <AccordionIcon w={'22px'} h={'22px'} />
            </AccordionButton>
          </h2>
          <AccordionPanel p={"0"} mt={"20px"}>
            <Collapse ref={ref} startingHeight={getCollapseSize(data.length)} in={show}>
              <Stack spacing={5} direction="column">
                {data.map((item, index) => (
                  <CheckboxStyled
                    {...getCheckboxProps({ value: isColor ? item.id : item.name })}
                    {...props}
                    color={item.color ? item.color === '#ffffff' ? 'red' : item.color : "#cb4508"}
                    key={index}
                  >
                    {isRating ? <RatingCheckbox rate={item} /> : <Text ms={"6.5px"}>{item.name}</Text>}
                  </CheckboxStyled>
                ))}
              </Stack>
            </Collapse>
            {data.length > 5 && (
              <Button
                size="sm"
                onClick={handleToggle}
                mt="1rem"
                px={"none"}
                fontFamily={"roboto"}
                fontWeight={"300"}
                fontSize={"16px"}
                lineHeight={"24px"}
                color={"#000"}
                background={"transparent"}
                _focus={{
                  color: "rgba(179, 62, 8, 1)",
                  background: "transparent",
                  boxShadow: "unset",
                }}
                _hover={{
                  color: "rgba(179, 62, 8, 1)",
                  background: "transparent",
                  boxShadow: "unset",
                }}
                _active={{
                  color: "rgba(179, 62, 8, 1)",
                  background: "transparent",
                  boxShadow: "unset",
                }}
              >
                <Text minW={"30px"} textAlign={"start"}>
                  {show ? "Скрыть" : `Еще ${data.length - 5}`}
                </Text>
                <ChevronDownIcon
                  transform={show ? "rotate(180deg)" : "rotate(365deg)"}
                  transition={"all 0.2s ease"}
                />
              </Button>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default CheckBoxList;
