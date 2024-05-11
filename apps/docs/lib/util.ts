export const getUnscopedPackageName = (str: string) => (str.includes("/") ? str.split("/")[1] : str);
export const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);
