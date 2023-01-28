import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Center,
    CloseButton,
    Code,
    HStack,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import RenderFormComponent from "@form-builder/src/components/render";
import { FormsShapes } from "@form-builder/src/types";
import { GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";

export default function Login(): JSX.Element {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState<string | undefined>(undefined);
    const { onClose, onOpen, isOpen } = useDisclosure({ defaultIsOpen: false });
    const { t } = useTranslation();
    const { data, status } = useSession();

    const loginFormScheme: FormsShapes = {
        active: true,
        as: "forms",
        performance: true,
        title: "Login Form",
        id: "login-form",
        data: [
            {
                label: "Username",
                name: "username",
                id: "username",
                active: true,
                errorMessage: "Username is required",
                type: "email",
                required: true,
                style: {
                    width: "100%",
                },
                default: "oratoreeza@gmail.co",
            },
            {
                label: "Password",
                name: "password",
                id: "password",
                active: true,
                errorMessage: "Password is required",
                type: "password",
                required: true,
                style: {
                    width: "100%",
                },
                default: "password",
            },
        ],
    };

    function submitData(data: any) {
        setError(undefined);
        setLoading(true);
        signIn("credentials", {
            redirect: false,
            username: data.username,
            password: data.password,
        })
            .then((res) => {
                if (res?.error) {
                    setError(res?.error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (isError) onOpen();
        else onClose();
    }, [isError]);

    return (
        <Stack flex={1}>
            {status === "unauthenticated" && (
                <Center h="full">
                    <Box shadow="md" rounded="lg">
                        {isOpen && (
                            <Alert
                                status="error"
                                display="flex"
                                flex={1}
                                justifyContent="space-between"
                            >
                                <HStack>
                                    <AlertIcon />
                                    <AlertDescription>
                                        {isError}
                                    </AlertDescription>
                                </HStack>
                                <CloseButton onClick={onClose} float="right" />
                            </Alert>
                        )}
                        <RenderFormComponent
                            formSchema={loginFormScheme}
                            onHandleSubmit={(d) => submitData(d)}
                            setBtnLoading={isLoading}
                            btnSubmiTitle={t("signin")}
                        />
                    </Box>
                </Center>
            )}
            {status === "authenticated" && (
                <Code>
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </Code>
            )}
            {status === "loading" && <div>loading...</div>}
        </Stack>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await getServerSideTranslations(locale as string, [
                "common",
                "auth",
            ])),
            data: [],
        },
    };
};
