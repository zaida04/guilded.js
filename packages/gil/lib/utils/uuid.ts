// REGEX Matching
const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const regexHashId = /^[0-9A-Za-z]{8,16}$/;

export const isUUID = (str: string) => regexUUID.test(str);
export const isHashId = (str: string) => regexHashId.test(str);
