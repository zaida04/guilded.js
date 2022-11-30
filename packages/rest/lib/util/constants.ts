/**
 * The meanings of each of the known guilded api response status codes.
 */
export const GUILDED_STATUS_CODES = {
    200: "The request was successful" as const,
    201: "The content was created" as const,
    204: "No content returned" as const,
    400: "The request was unacceptable, often due to missing parameters" as const,
    401: "The access token is missing or invalid" as const,
    403: "The bot does not have the necessary permissions" as const,
    404: "The requested resource does not exist" as const,
    409: "The request conflicted with another request" as const,
    500: "Something went wrong on our end" as const,
    501: "Something went wrong on our end" as const,
    502: "Something went wrong on our end" as const,
    503: "Something went wrong on our end" as const,
    504: "Something went wrong on our end" as const,
};
