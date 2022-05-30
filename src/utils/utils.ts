export const convertDateToTime = (date?: string) => {
    if (date) return new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

export const convertDateToDateTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB") + ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};
