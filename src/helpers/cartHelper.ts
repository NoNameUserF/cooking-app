export const getName = (name: string): string => {
    return name.replace(/\s*\(.*?\)/, "");
};

export const getAmount = (name: string): string => {
    const match = name.match(/\((.*?)\)/);
    return match ? match[1] : "";
};
