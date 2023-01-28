import { AxiosError } from "axios";
import { showToast } from "../ui";
import { APIErrorResponseType } from "./types";

export const handleError = (
    error: AxiosError<APIErrorResponseType, any>,
): void => {
    if (error.response) {
        const statusCode = error?.response?.status;
        // client received an error response (5xx, 4xx)
        switch (statusCode) {
            case 401:
                showToast({
                    message: "Session expired",
                    type: "error",
                });
                break;
            case 404:
                showToast({
                    message: "Data not found",
                    type: "error",
                });
                break;
            case 422:
                showToast({
                    message: error?.response?.data?.message,
                    type: "error",
                });
                break;
            default:
                showToast({
                    message: "There's something wrong",
                    type: "error",
                });
        }
    } else {
        showToast({
            message: "There's something wrong",
            type: "error",
        });
    }
    //new Slack("https://hooks.slack.com/services/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").post(`ERROR!!! \n ````${JSON.stringify({...error, ...userState?.profile, ...userAction}````, null, "\t")}`)
    // Sentry.Native.captureException(new Error(JSON.stringify({...error, ...userState?.profile})))
    // if (error?.message != "Cancel Query") {
    //     if (!__DEV__)
    //         new Slack(
    //             "https://hooks.slack.com/services/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",
    //         ).post(
    //             `>*💥 JAKSEHAT - FETCH ERROR!!! 💥* \n Error Message:  *${
    //                 error &&
    //                 (error.response
    //                     ? JSON.stringify(
    //                           error.response.data,
    //                           null,
    //                           "\t",
    //                       )
    //                     : error)
    //             }* \n >Stack Trace : \`\`\`${JSON.stringify(
    //                 {
    //                     ...error,
    //                     ...userState?.profile,
    //                     ...userAction,
    //                 },
    //                 null,
    //                 "\t",
    //             )}\`\`\``,
    //         );
    // }
};
