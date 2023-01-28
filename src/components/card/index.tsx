import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

export const Card = (props: BoxProps): JSX.Element => (
    <Box bg="white" shadow="base" rounded="md" {...props} />
);

Card.Header = (props: BoxProps) => (
    <Box
        p={4}
        borderBottomWidth="1px"
        borderBottomColor="blueGray.100"
        {...props}
    >
        {props.children}
    </Box>
);

Card.Body = (props: BoxProps) => (
    <Box p={4} {...props}>
        {props.children}
    </Box>
);

Card.Footer = (props: BoxProps) => (
    <Box p={4} {...props} borderTopWidth="1px" borderTopColor="gray.50">
        {props.children}
    </Box>
);
