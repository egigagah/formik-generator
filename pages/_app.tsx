import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { Hydrate } from "react-query/hydration";
import Layouts from "@components/layouts";
import NextNProgress from "nextjs-progressbar";
import { createStandaloneToast } from "@chakra-ui/react";

function MyApp({
    Component,
    pageProps: { ...pageProps },
}: AppProps): JSX.Element {
    const queryClient = new QueryClient();

    const { ToastContainer } = createStandaloneToast();

    return (
        <>
            <NextNProgress />
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    {/* <Hydrate state={pageProps.dehydratedState}> */}
                    <Layouts>
                        <Component {...pageProps} />
                    </Layouts>
                    {/* </Hydrate> */}
                </QueryClientProvider>
            </ChakraProvider>
            <ToastContainer />
        </>
    );
}

export default MyApp;
