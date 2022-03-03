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
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getAuthInfo } from './utils';
import { updateAuthInfo, updateUserInfo } from './actions/authAction';
import { useSelector } from 'react-redux';
import { ModalLoader } from './components';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const { userId, accessToken, isLoggedIn } = getAuthInfo();
      console.log(userId, accessToken, isLoggedIn);
      dispatch(updateAuthInfo(isLoggedIn, accessToken));

      if (userId && accessToken) dispatch(updateUserInfo(userId, accessToken));
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Route exact path={['/game/:id', '/']} component={Home} />
        <ProtectedRoute
          exact
          path={['/my-profile']}
          component={MyProfile}
          to={'/login'}
        />
        <Route path={'/twitch-gaming'} component={TwitchGaming} />
        <Route path={'/youtube-gaming'} component={YoutubeGaming} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/about-us'} component={AboutUs} />
        <Route path={'/email-confirm'} component={EmailConfirm} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />
        <Route path='/terms-and-conditions' component={TermsAndConditions} />
      </Router>
      {isLoading && <ModalLoader />}
    </div>
  );
};

export default App;
