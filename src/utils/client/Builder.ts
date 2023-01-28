import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import { getSession } from "next-auth/react";
import { handleError } from "./ErrorHandler";
import { APIResponse, ParamsType } from "./types";

class OrmBuilder {
    private url: string;
    service: AxiosInstance;
    private _params: string;
    cancellation: AbortController;

    constructor(url: string, baseURL?: string, cancel?: AbortController) {
        const cancellation = cancel ?? new AbortController();
        const instance = axios.create({
            baseURL: baseURL,
            signal: cancellation.signal,
        });
        instance.interceptors.request.use(
            async function (config) {
                const { url } = config;
                if (config.baseURL && !url?.includes(config.baseURL as string))
                    config.url = `${config?.baseURL}${url}`;
                config.headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                };
                // const session: any = await getSession();
                // if (session) {
                //     config.headers = {
                //         ...config.headers,
                //         Authorization: `${
                //             session?.accessToken?.token_type || "Bearer"
                //         } ${session?.accessToken?.access_token}`,
                //     };
                // }
                return config;
            },
            async function (error) {
                return Promise.reject(error);
            },
        );
        instance.interceptors.response.use(
            (response) => {
                return Promise.resolve(response);
            },
            (error) => {
                handleError(error);
                return Promise.reject(error);
            },
        );
        this.service = instance;
        this.url = url;
        this._params = "";
        this.cancellation = cancellation;
    }

    from(url: string) {
        this.url = url;
        return this;
    }

    private getUrl(id?: string): string {
        let url = this.url;
        if (id) {
            url = url + "/" + id;
        }
        return url;
    }

    private getUrlWithParams(id?: string): string {
        let url = this.getUrl();
        if (id) {
            url = url + "/" + id;
        }
        if (this._params) {
            url = url + "?" + this._params;
        }
        return url;
    }

    params(params?: ParamsType): this {
        if (!params) {
            return this;
        }
        const queryParams = Object.keys(params)
            .map((key) => {
                return (
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent((params as any)[key])
                );
            })
            .join("&");

        this._params = queryParams;
        return this;
    }

    async customRequest(
        config: { url: string } & AxiosRequestConfig,
    ): Promise<APIResponse> {
        return await this.service(config);
    }

    async getAll(): Promise<APIResponse> {
        // const headers = await this._getHeaders();
        const url = this.getUrlWithParams();
        return await this.service.get(url, {
            responseType: "json",
            // headers,
        });
    }

    async find(id: string): Promise<APIResponse> {
        const url = this.getUrlWithParams(id);
        return await this.service.get(url, {
            responseType: "json",
        });
    }

    async delete(ids: Array<string>): Promise<APIResponse> {
        const url = this.getUrl();
        return await this.service.delete(url, {
            responseType: "json",
            data: JSON.stringify({ ids }),
        });
    }

    async duplicate(id: string): Promise<APIResponse> {
        const url = this.getUrlWithParams(id);
        return await this.service.post(url, null, {
            responseType: "json",
        });
    }

    async create<T>(body: T): Promise<APIResponse> {
        const url = this.getUrl();
        return await this.service.post(url, JSON.stringify(body), {
            responseType: "json",
        });
    }

    async update<T>(id: string, body: T): Promise<APIResponse> {
        const url = this.getUrl(id);
        return await this.service.put(url, JSON.stringify(body), {
            responseType: "json",
        });
    }

    abort() {
        this.cancellation.abort();
    }
}

export default class ApiClient extends OrmBuilder {
    constructor(apiBaseUrl: string) {
        super("", apiBaseUrl);
        if (!apiBaseUrl) throw new Error("Base API URL is required.");
    }
}
