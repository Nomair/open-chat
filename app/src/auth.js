const IS_LOGGED_IN = "isLoggedIn";

export const isLoggedIn = () => IS_LOGGED_IN in localStorage;
export const rememberLogin = (username) =>
  localStorage.setItem(IS_LOGGED_IN, username);
export const forgetLogin = () => localStorage.removeItem(IS_LOGGED_IN);

export const getUserName = () => localStorage.getItem(IS_LOGGED_IN);
