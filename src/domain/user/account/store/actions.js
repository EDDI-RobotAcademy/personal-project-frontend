import axiosInst from '@/utility/axiosInst'

export default {
    requestRegisterAccountToSpring ({ }, payload) {

        const { email, password, phoneNumber, nickname, address } = payload

        return axiosInst.spring.post('/account/sign-up', { email, password, phoneNumber, nickname, address })
            .then((res) => {
                alert('회원 신청하기 성공')
                return res.data
            })
            .catch(() => {
                alert('문제 발생')
            })
    },
    requestLoginAccountToSpring({}, payload) {
        const{ email, password } = payload
            
        return axiosInst.spring.post('/account/sign-in', { email, password })
        .then((res) => {
            if (res.data != null) {
                alert('로그인되었습니다.')
                localStorage.setItem('isLogin', 'true');
    
                const refreshTokenExpires = new Date(res.data);
    
                const remainingTime = refreshTokenExpires.getTime() - new Date().getTime();

                const logoutOrExpire = () => {
                    localStorage.removeItem('isLogin');
                    alert('로그아웃 되셨습니다.');
                };
            
                setTimeout(logoutOrExpire, remainingTime);
    
            } else {
                alert('로그인이 실패하였습니다.')
            }
        })
        .catch(() => {
            alert('문제 발생')
        })
    },
    
    requestLogOutAccountToSpring({}, ) {
        return axiosInst.spring.post('/account/sign-out')
        .then(() => {
            localStorage.setItem("isLogin", false)
            alert('로그아웃 되셨습니다')
        })
        .catch(() => {
            alert('문제 발생')
        })
    },
    async requestCheckEmailToSpring({}, payload) {
        const { email } = payload;
        try {
          const res = await axiosInst.spring.post("/account/check-duplicate-email", { email });
          if (res.data === false) {
            alert("이미 등록된 이메일입니다.");
            return;
          }
          alert("사용 가능한 이메일입니다.");
          return res.data;
        } catch (error) {
          alert("문제 발생");
        }
      },
      async requestCheckNicknameToSpring({}, payload) {
        const { nickname } = payload;
        try {
          const res = await axiosInst.spring.post("/account/check-duplicate-nickname", { nickname });
          if (res.data === false) {
            alert("이미 등록된 닉네임입니다.");
            return;
          }
          alert("사용 가능한 닉네임입니다.");
          return res.data;
        } catch (error) {
          alert("문제 발생");
        }
      },
      async requestCheckPhonenumberToSpring({}, payload) {
        const { phoneNumber } = payload;
        try {
          const res = await axiosInst.spring.post("/account/check-duplicate-phoneNumber", { phoneNumber });
          if (res.data === false) {
            alert("이미 등록된 전화번호입니다.");
            return;
          }
          alert("사용 가능한 전화번호입니다.");
          return res.data;
        } catch (error) {
          alert("문제 발생");
        }
      },
      async requestNicknameToSpring({}, ) { 
          const isLogin = localStorage.getItem('isLogin');
          if (isLogin) {
            const cookieString = document.cookie;
            const value = cookieString
            .split("; ")
            .find((cookie) => cookie.startsWith("AccessToken"))
            ?.split("=")[1];
            try {
                const res = await axiosInst.spring.post(`/account/request-nickname/${value}`);
                return res.data;
            } catch (error) {
                alert("문제 발생");
            }
        } else {
            return;
        }
      },
}