const ONE_DAY = 1000 * 60 * 60 * 24;

export const {
  API_PORT = 4000,
  ENV = "development",

  DB_USERNAME = "admin",
  DB_PASSWORD = "admin",
  DB_HOST = "localhost",
  DB_PORT = 27017,
  DB_NAME = "openChatDB",

  SESS_NAME = "sid",
  SESS_SECRET = "ssh!secret!",
  SESS_LIFETIME = ONE_DAY,

  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  // REDIS_PASSWORD = "####",
} = process.env;

export const IS_PROD = ENV === "production";

// Password URL encoded to escape special characters
export const DB_URI = `mongodb://${DB_USERNAME}:${encodeURIComponent(
  DB_PASSWORD
)}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

export const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

export const REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  // password: REDIS_PASSWORD,
};

export const SESS_OPTIONS = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: +SESS_LIFETIME,
    sameSite: true,
    secure: IS_PROD,
  },
};

export const APOLLO_OPTIONS = {
  playground: IS_PROD
    ? false
    : {
        settings: {
          "request.credentials": "include",
          //TODO handle CORS
        },
      },
};
