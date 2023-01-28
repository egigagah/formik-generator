import { Flex, Stack } from "@chakra-ui/react";
// import Link from "next/link";
import { PropsWithChildren } from "react";
// import Header from "./Header";

export default function Layouts({ children }: PropsWithChildren): JSX.Element {
    return (
        <Flex
            flex={1}
            flexDirection="column"
            bg={["white", "gray.50"]}
            h="100vh"
        >
            {/* <Header>
                <Link href="/form-builder">
                    <a>Form Builder</a>
                </Link>
                <Link href="/form-builder?data=sample">
                    <a>Form Builder With Data</a>
                </Link>
            </Header> */}
            <Stack
                flex={1}
                justifyContent={["flex-start", "center"]}
                spacing={4}
                px={[4, 0]}
            >
                {children}
            </Stack>
        </Flex>
    );
}
