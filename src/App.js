import React from 'react';
//Component and pages
import {
  Home,
  EmailConfirm,
  Login,
  Register,
  TwitchGaming,
  YoutubeGaming,
  PrivacyPolicy,
  TermsAndConditions,
  MyProfile,
  AboutUs,
} from './pages';

//styles
import './global.css';
//Router
import { Routes, Route, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getAuthInfo } from './utils';
import { updateAuthInfo, updateUserInfo } from './actions/authAction';

import ProtectedRoute from './ProtectedRoute';
import { GameDetails } from './components';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const { userId, accessToken, isLoggedIn } = getAuthInfo();
      dispatch(updateAuthInfo(isLoggedIn, accessToken));

      if (userId && accessToken) dispatch(updateUserInfo(userId, accessToken));
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/games'} element={<Home />}>
          <Route path={':id'} element={<GameDetails />} />
        </Route>

        {/* <ProtectedRoute
            exact
            path={['/my-profile']}
            element={<MyProfile />}
            to={'/login'}
          /> */}
        <Route path={'/twitch-gaming/:another-id'} element={<TwitchGaming />} />
        <Route path={'/youtube-gaming'} element={<YoutubeGaming />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/about-us'} element={<AboutUs />} />
        <Route path={'/email-confirm'} element={<EmailConfirm />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />

        {/* Fallback route */}
        <Route
          path='*'
          element={
            <>
              <h2>Page doesn't exist</h2>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
