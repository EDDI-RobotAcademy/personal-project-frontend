const env = {
    mode: process.env.NODE_ENV,
    api: {
        MAIN_API_URL: process.env.VUE_APP_BASE_URL,
        NAVER_ID: process.env.VUE_APP_MY_ID,
        KAKAO_ID: process.env.VUE_APP_KAKAO_ID
    },
}
export default env
 