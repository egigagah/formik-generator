import { AxiosError } from "axios";
import FormData from "form-data";
import { ApiBuilder } from "../misc";
import {
    APIErrorResponseType,
    CustomRequest,
    LoginResponseType,
} from "./types";

const clientId = process.env.NEXT_CREDENTIALS_CLIENT_ID;
const clientSecret = process.env.NEXT_CREDENTIALS_CLIENT_SECRET;

export async function login(
    creds?: Record<"username" | "password", string>,
): Promise<LoginResponseType> {
    const data = new FormData();
    data.append("grant_type", "password");
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("username", creds?.username);
    data.append("password", creds?.password);

    const config: CustomRequest = {
        method: "post",
        url: "/oauth/token",
        headers: {
            Accept: "application/json",
            ...data.getHeaders(),
        },
        data: data,
    };

    return await ApiBuilder.customRequest(config)
        .then(function (response) {
            return response.data;
        })
        .catch((error: AxiosError<APIErrorResponseType>) => {
            throw new Error(error.response?.data.message);
        });
}
