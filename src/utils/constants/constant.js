export const SUCCESS_STATUS_CODE = 200;

// Role Constants
export const DEFAULT_ROLE = "admin";

export const ADMIN_ROLE = "admin";

export const SUPER_ADMIN_ROLE = "superadmin";

export const CLIENT_ROLE = "client";

// localStorage Keys
export const ACCESS_TOKEN = "accessToken";

export const REFRESH_TOKEN = "refreshToken";

export const USER_DATA = "userData";

export const SUB_PERMISSION = "sub_permission";

export const SETTINGS = "settings";

export const PERSIST_AUTH = "persist:auth";

export const SIGNUP_MESSAGE = {
  SUCCESS: "Sign up successful.",
  ERROR: "failed! please try again",
};

// Temporary Object for basic theme
export const BASIC_USER_DATA = {
  data: {
    id: 1,
    password: "admin",
    fullName: "Inventam",
    username: "inventam",
    email: "admin@inventam.com",
    // role: 'admin',
  },
  token: "temp.token",
  refreshToken: "temp.refreshToken",
};
