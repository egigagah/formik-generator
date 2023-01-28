import React from "react";
import { FormBuilder, resetServerContext } from "@form-builder";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { CustomAppElement } from "src/types";

const Home: CustomAppElement = () => {
    const route = useRouter();

    return <FormBuilder slug={route.query?.data as string} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    resetServerContext();
    return {
        props: {
            data: [],
        },
    };
};
