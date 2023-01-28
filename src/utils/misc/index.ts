import ApiClient from "../client/Builder";

const ApiBuilder = new ApiClient(
    (process.env.NEXT_PUBLIC_API_URL as string) ||
        "https://api-dinkes.jakarta.go.id/jaksehat",
);

export { ApiBuilder };
