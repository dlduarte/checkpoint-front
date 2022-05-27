export function parse(date) {
    if (!date) return null;

    if (date instanceof Date) {
        const year = date.getFullYear(),
            month = (date.getMonth() + 1).toString().padStart(2, "0"),
            day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const [day, month, year] = date.split("/");

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function today() {
    return parse(new Date());
}