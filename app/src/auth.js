const IS_LOGGED_IN = "isLoggedIn";

export const isLoggedIn = () => {
  console.log(IS_LOGGED_IN in localStorage);
  return IS_LOGGED_IN in localStorage;
};

export const rememberLogin = () => localStorage.setItem(IS_LOGGED_IN, "");

export const forgetLogin = () => localStorage.removeItem(IS_LOGGED_IN);
