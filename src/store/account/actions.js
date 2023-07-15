import axiosInst from '@/utility/axiosInst'

export default {
    requestRegistAccountToSpring({ }, payload) {
        const { email, nickname, password } = payload;
        return axiosInst.springAxiosInst.post("/account/register", { email, nickname, password })
            .then((res) => {
                if (res.data) {
                    alert("가입 성공!");
                } else {
                    alert("동일한 계정이 이미 존재합니다");
                }
            });
    },
    requestSpringToCheckEmailDuplication({ }, email) {
        return axiosInst.springAxiosInst.get(`/account/email-check`, { params: { email: email } })
            .then((res) => {
                if (res.data) {
                    alert('사용 가능한 이메일입니다!')
                    return true
                } else {
                    alert('중복된 이메일입니다!')
                    return false
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestSpringToCheckNicknameDuplication({ }, nickname) {
        return axiosInst.springAxiosInst.get(`/account/nickname-check`, { params: { nickname: nickname } })
            .then((res) => {
                if (res.data) {
                    alert("사용 가능한 닉네임입니다!")
                    return res.data
                } else {
                    alert("중복된 닉네임입니다!")
                    return res.data
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestLoginToSpring({ }, payload) {
        const { email, password } = payload;
        return axiosInst.springAxiosInst.post("/account/login", { email, password })
            .then((res) => {
                if (res.data != null) {
                    alert("로그인 성공!");
                    localStorage.setItem("nickname", res.data)
                    return true
                } else {
                    alert("로그인 실패!");
                    return false
                }
            });
    },
    requestLogoutToSpring({ }) {
        return axiosInst.springAxiosInst.post("/account/logout")
            .then((res) => {
                alert("로그아웃")
            })
            .catch(() => {
                alert("실패")
            })
    },
    requestPasswordCheckToSpring({ }, payload) {
        const { password } = payload;
        return axiosInst.springAxiosInst.post("/account/password-check", { password })
            .then((res) => {
                if (res.data != null) {
                    alert("확인 성공!");
                    return true
                } else {
                    alert("확인 실패!");
                    return false
                }
            });
    },
    requestAccountModifyToSpring({ }, payload) {
        const { nickname, password } = payload;
        return axiosInst.springAxiosInst.post("/account/modify", { nickname, password })
            .then((res) => {
                if (res.data != null) {
                    alert("수정 성공!");
                    return true
                } else {
                    alert("수정 실패!");
                    return false
                }
            });
    },
}