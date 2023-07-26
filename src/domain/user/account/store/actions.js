


import axiosInst from '@/utility/axiosInst'

export default {
    requestRegisterAccountToSpring ({ }, payload) {

        const { email, password } = payload

        return axiosInst.spring.post('/account/sign-up', { email, password })
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
            if(res.data == true) {
                alert('로그인되었습니다.')
                localStorage.setItem('isLogin', 'true'); // 로그인 상태 저장

                // 응답 헤더에서 쿠키 만료일을 얻는다.
                const cookieExpires = new Date(
                res.headers['set-cookie']
                    .split(';')
                    .find((part) => part.trim().startsWith('Expires='))
                    .split('=')[1]
                );

                const remainingTime = cookieExpires.getTime() - new Date().getTime();

                // 로그아웃 또는 만료 시 실행되는 함수
                const logoutOrExpire = () => {
                  localStorage.removeItem('isLogin');
                  alert('로그아웃 되셨습니다.');
                };
        
                setTimeout(logoutOrExpire, remainingTime); // 쿠키 만료 시간에 맞추어 설정            
        
                
            } else {
                alert('로그인이 실패하였습니다.')
            }
        })
    },
    requestLogOutAccountToSpring({}, ) {
        return axiosInst.spring.post('/account/sign-out')
        .then(() => {
            localStorage.setItem("isLogin", false)
            alert('로그아웃 되셨습니다')
        })
    }
}