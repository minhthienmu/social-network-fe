export const convertDateToTime = (date?: string) => {
    if (date) return new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};
