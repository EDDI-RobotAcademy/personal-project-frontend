const env = {
  mode: process.env.NODE_ENV,
  api: {
    MAIN_API_URL: process.env.VUE_APP_BASE_URL,
    MAIN_KAKAO_API_KEY: process.env.VUE_APP_KAKAO_API_KEY,
  },
};

export default env;
