import { v4 as uuidv4 } from 'uuid';

// Creates a new UUID string
export const createUuid = () => {
    const uuid = uuidv4();
    return uuid;
};

// Today's date as a "YYYY-MM-DD" string
export const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
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