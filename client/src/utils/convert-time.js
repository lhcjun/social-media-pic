const toTwoDigits = number => `0${number}`.slice(-2);

export const convertTime = (dateValue) => {
    // convert UTC time to locale time
    const localeTime = new Date(dateValue);

    return `${localeTime.getFullYear()}/${localeTime.getMonth() + 1}/${localeTime.getDate()} ${toTwoDigits(localeTime.getHours())}:${toTwoDigits(localeTime.getMinutes())}:${toTwoDigits(localeTime.getSeconds())}`;
};

export const convertDate = (dateValue) => {
    const localeTime = new Date(dateValue);
    return `${localeTime.getFullYear()}/${localeTime.getMonth() + 1}/${localeTime.getDate()}`;
};