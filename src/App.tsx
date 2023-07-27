import React, { useEffect } from 'react';
import MainRouter from './router/MainRouter';
import NavigationBar from './navigation/NavigationBar'
import NavigatonBottomBar from './navigation/NavigatonBottomBar'
import "./firebase";
import { getAuth } from 'firebase/auth';
import { loginUser } from './api/UserApi';
import { useNavigate } from 'react-router-dom';
import useUserStore from './store/UserStore';
import { User } from './user/entity/User';

const App: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('firebase : ', user);
        const result = await loginUser(user.uid);
        console.log('server : ', result);
        if (result) {
          setUser(result);
          if (window.location.pathname.includes('sign-up') || window.location.pathname.includes('sign-in')) {
            navigate('/key-we-board-page/list');
          }
        } else {
          // alert('회원가입해야함');
          navigate('/key-we-board-page/sign-up');
        }
      } else {
        setUser({} as User);
      }
    });
  }, []);

  return (
    <div>
      <div style={{position: 'relative'}}>      
      <NavigationBar />
      </div>
    
      <div style={{ position: 'relative', minHeight: 100 }}>
        <MainRouter />
      </div>
      <div>
        <NavigatonBottomBar />
      </div>
    </div>
  );
}

export default App;