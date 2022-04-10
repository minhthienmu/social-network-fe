export const IS_LOGGEDIN = "IS_LOGGEDIN";

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: IS_LOGGEDIN,
    isLoggedIn,
});
