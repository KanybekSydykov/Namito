import { Checkbox, useCheckbox } from "@chakra-ui/react";

const bgColor = "#EDEDF0";
const controlColor = "#4C589E";
const focusColor = "#B4BBE2";

export const CheckboxStyled = ({
  children,
  spacing = "1rem",
  rounded,
  roundedFull,
  color,
  ...props
}) => {

    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props)
  const defaultClasses = ({ radius = "4px", controlRadius = "4px" }) => {
    return {
      h: "24px",
      w: "fit-content",
      _checked: {
        h: "24px",
        borderRadius: radius,
      },
      "span[class*='checkbox__control']:not([data-disabled])": {
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: '1px',
        borderRadius: controlRadius,
        bg:'rgba(240, 240, 240, 1)',
        _checked: {
          bg: color ? color : bgColor,
          borderColor: 'rgba(240, 240, 240, 1)',
        },
        _focus: {
          boxShadow: `unset`,
          _checked: {
            boxShadow: `unset`,
          },
        },
        _after: {
          transitionProperty: "all",
          transitionDuration: "normal",
          content: `""`,
          position: "absolute",
          width: "0px",
          height: "0px",
          bg: `transparent`,
          borderRadius: radius,
          zIndex: -1,
        },
      },
      _hover: {
        "span[class*='checkbox__control']:not([data-disabled])": {
          _after: {
            width: "24px",
            height: "24px",
            borderColor: 'transparent',
          },
        },
      },
    };
  };
  let classes = defaultClasses({});

  if (roundedFull) {
    classes = defaultClasses({ radius: "99px", controlRadius: "99px" });
  }

  if (rounded) {
    classes = defaultClasses({ radius: "8px", controlRadius: "2px" });
  }

  return (
    <Checkbox spacing={spacing} size={'lg'} sx={classes} {...props} >
      {children}
    </Checkbox>
  );
};
