import { v4 as uuidv4 } from 'uuid';

// Creates a new UUID string
export const createUuid = () => {
    const uuid = uuidv4();
    return uuid;
};

export const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const dayString = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${monthString}-${dayString}`;
};

// The name of the day of the week for the given "YYYY-MM-DD" string
export const dayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    switch (day) {
        case 0:
            return "Monday";
        case 1:
            return "Tuesday";
        case 2:
            return "Wednesday";
        case 3:
            return "Thursday";
        case 4:
            return "Friday";
        case 5:
            return "Saturday";
        case 6:
            return "Sunday";
        default:
            return "Unknown";
    }
};

// Read URL query parameter
export const readUrlQueryParameter = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
};

// Update URL query parameter
export const updateUrlQueryParameter = (key: string, value: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.replaceState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
};

// Shorten a list of strings to a maximum length
// >>> shortenList(["a", "b", "c", "d", "e"], 3)
// "a, b, c, and 2 more..."
export const summarizeList = (list: string[], maxLength: number) => {
    if (list.length <= maxLength) {
        return list.join(", ");
    }
    const shortenedList = list.slice(0, maxLength);
    const more = list.length - maxLength;
    return `${shortenedList.join(", ")}, and ${more} more…`;
};