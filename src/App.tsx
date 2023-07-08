import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/header/Header';
import SignUpPage from './account/pages/SignUpPage';
import LogInPage from 'account/pages/LogInPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div>
        <Header>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Header>
      </div>
    </BrowserRouter>
  );
}

export default App;
