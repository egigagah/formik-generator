import { Button as CUIButton, ButtonProps } from "@chakra-ui/react";
import * as React from "react";

export const Button = (
    props: ButtonProps & { danger?: boolean },
): JSX.Element => {
    const baseStyles = {
        borderWidth: "1px",
        shadow: "base",
        rounded: "base",
        size: "sm",
    };
    const primaryStyles = {
        bg: "brand.primary",
        borderColor: "brand.primary",

        color: "white",
        _hover: { opacity: 0.9 },
        _focus: { outline: 0, outlineOffset: 0 },
        _active: { opacity: 0.6 },
    };

    const dangerStyles = {
        bg: "red.600",
        borderColor: "red.600",
        color: "white",
        _hover: { opacity: 0.9 },
        _focus: { outline: 0, outlineOffset: 0 },
        _active: { opacity: 0.6 },
    };

    const styles = props.danger ? dangerStyles : primaryStyles;

    return <CUIButton {...baseStyles} {...styles} {...props} />;
};

Button.Ghost = (props: ButtonProps) => (
    <Button
        bg="transparent"
        color="gray.800"
        shadow="none"
        border="none"
        _hover={{ bg: "transparent" }}
        {...props}
    />
);

Button.Secondary = (props: ButtonProps) => {
    const style = {
        bg: "brand.secondary",
        borderColor: "brand.secondary",

        color: "white",
        _hover: { opacity: 0.9 },
        _focus: { outline: 0, outlineOffset: 0 },
        _active: { opacity: 0.6 },
    };
    return <Button {...style} {...props} />;
};
