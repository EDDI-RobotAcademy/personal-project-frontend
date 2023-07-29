import axiosInst from '@/utility/axiosInst'
import { LOGIN_COMPLETE } from "./mutation-types"

export default {
    // 회원 가입 요청
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
    // 이메일 중복 요청
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
    // 닉네임 중복 확인 요청
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
    // 로그인 요청
    requestLoginToSpring({ commit }, payload) {
        const { email, password } = payload;
        return axiosInst.springAxiosInst.post("/account/login", { email, password })
            .then((res) => {
                if (res.data != null) {
                    alert("로그인 성공!");
                    localStorage.setItem("nickname", res.data)
                    localStorage.setItem("isLogin", true)
                    commit(LOGIN_COMPLETE, true)
                    return true
                } else {
                    alert("로그인 실패!");
                    return false
                }
            })
            .catch(() => {
                alert("이메일 혹은 비밀번호를 다시 한번 확인해주세요")
            });

    },
    // 로그아웃 요청
    requestLogoutToSpring({ commit }) {
        return axiosInst.springAxiosInst.post("/account/logout")
            .then((res) => {
                commit(LOGIN_COMPLETE, false)
                alert("로그아웃")
            })
            .catch(() => {
                alert("실패")
            })
    },
    // 비밀번호 확인 요청
    requestPasswordCheckToSpring({ }, payload) {
        const { password } = payload;
        return axiosInst.springAxiosInst.post("/account/password-check", { password })
            .then((res) => {
                if (res.data != null) {
                    return true
                } else {
                    alert("확인 실패!");
                    return false
                }
            });
    },
    // 정보 수정 요청
    requestAccountModifyToSpring({ }, payload) {
        const { nickname, password } = payload;
        return axiosInst.springAxiosInst.post("/account/modify", { nickname, password })
            .then((res) => {
                if (res.data) {
                    alert("수정 성공!");
                    return true
                } else {
                    alert("수정 실패!");
                    return false
                }
            });
    },
    // 회원 탈퇴 요청
    requestAccountWithdrawToSpring({ commit }) {
        return axiosInst.springAxiosInst.delete("/account/withdraw")
            .then((res) => {
                if (res.data) {
                    alert("탈퇴 성공!");
                    commit(LOGIN_COMPLETE, false)
                    return true
                } else {
                    alert("탈퇴 실패!");
                    return false
                }
            });
    },
}