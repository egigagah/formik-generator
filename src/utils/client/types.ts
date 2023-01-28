import { AxiosError, AxiosRequestConfig } from "axios";

export type LoginResponseType = {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
};

export type APIErrorResponseType = {
    error: string;
    error_description: string;
    hint: "";
    message: string;
};

export type fetchDatasProps = {
    url: RequestInfo | URL | string;
    config?: RequestInit;
};

export type APIResponse = any | AxiosError<APIErrorResponseType> | null;

export type ParamsType = {
    id_in?: string;
    page?: number;
    limit?: number;
    filter?: string;
    sort?: string;
    with?: string;
    [key: string]: any;
};

export type CustomRequest = {
    url: string;
    method: "get" | "post" | "put" | "delete" | "patch";
} & AxiosRequestConfig;
