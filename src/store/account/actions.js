import router from '@/router'
import axiosInst from '@/utility/axiosInst'
import { LOGIN_COMPLETE, SET_USER_NICKNAME, REQUEST_ACCOUNT_TO_SPRING } from './mutation-types';

export default {
    requestNormalRegisterAccountToSpring({ commit }, payload) { // commit을 인자로 추가
        return axiosInst.post('/account/normal-register', payload)
            .then((resNormalRegister) => {
                console.log(resNormalRegister.data)
                if (resNormalRegister.data == true) {
                    alert('회원 가입 성공')
                    commit(LOGIN_COMPLETE, true) // isAuthenticated를 true로 설정
                    router.push('/login')
                } else {
                    alert('구매자 회원가입 실패!')
                }
            })
    },

    requestSpringToCheckEmailDuplication({ }, payload) {
        const { email } = payload
        console.log('email: ' + email)

        return axiosInst.get(`/account/check-email/${email}`)
            .then((res) => {
                console.log("res: " + res)
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

    requestLoginAccountToSpring({ commit }, payload) {
        return axiosInst.post('/account/login', payload)
            .then((resLogin) => {
                console.log(resLogin.data)
                if (resLogin.data !== '') {
                    alert('로그인 성공!');

                    const userNickname = resLogin.data.nickname;
                    console.log(userNickname) // 'nickname' 대신 실제 닉네임이 들어있는 키로 변경해야 합니다.

                    const account = resLogin.data

                    commit(SET_USER_NICKNAME, userNickname); // 뮤테이션을 커밋하여 사용자 닉네임을 상태(state)에 저장합니다.
                    commit(REQUEST_ACCOUNT_TO_SPRING, account)
                    localStorage.setItem('userNickname', userNickname)
                    commit(LOGIN_COMPLETE, true); // 로그인 상태로 변경
                    router.push('/');

                    localStorage.setItem('userToken', resLogin.data.userToken);

                } else {
                    alert('이메일과 비밀번호를 다시 확인해주세요!');
                    commit(SET_USER_NICKNAME, ''); // 로그인 실패 시 사용자 닉네임을 초기화합니다.
                }
            })
            .catch((error) => {
                alert('로그인 실패: ' + error.message);
                commit(SET_USER_NICKNAME, ''); // 로그인 실패 시 사용자 닉네임을 초기화합니다.
            });
    },




    // requestAccountToSpring({ commit }, payload) {
    //     const { userToken } = payload
    //     return axiosInst.post('account/give-info', { userToken })
    //         .then((resAccountRead) => {
    //             console.log("회원 정보: " + JSON.stringify(resAccountRead.data));
    //             commit(REQUEST_ACCOUNT_TO_SPRING, resAccountRead.data);
    //         })

    // },
    requestChangeUsernameToSpring({ }, payload) {
        const { id, newUserName } = payload

        return axiosInst.put(`/account/change-username/${id}`, { id, userName: newUserName })
            .then((resNewUserName) => {
                if (resNewUserName.data) {
                    alert("이름이 수정되었습니다.");
                    return resNewUserName.data;
                }
            })
            .catch(() => {
                alert("실패");
            });
    },

    requestChangeNicknameToSpring({ }, payload) {
        const { id, newNickname } = payload

        return axiosInst.put(`/account/change-nickname/${id}`, { id, nickname: newNickname })
            .then((resNewNickname) => {
                if (resNewNickname.data) {
                    console.log("resNewNickname.data: " + resNewNickname.data)
                    alert("닉네임이 수정되었습니다.");
                    return resNewNickname.data;
                }
            })
            .catch(() => {
                alert("닉네임 수정 통신 실패");
            });
    },

    requestDeleteAccountToSpring({ }, payload) {
        const { id } = payload

        return axiosInst.delete(`/account/${id}`, { id })
            .then((resAccountDelete) => {
            })
            .catch(() => {
                alert("회원 탈퇴 실패");
            });
    },
}