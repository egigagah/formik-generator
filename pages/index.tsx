import React from "react";
import { FormBuilder } from "@form-builder";
import { useRouter } from "next/router";
import { CustomAppElement } from "src/types";

const Home: CustomAppElement = () => {
    const route = useRouter();

    return <FormBuilder slug={route.query?.data as string} />;
};

export default Home;
