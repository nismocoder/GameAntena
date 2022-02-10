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
} from './pages';
//styles
import './global.css';
//Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getLocalStorageItem } from './utils';
import { updateUserAuthInfo } from './actions/authAction';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      let accessToken = getLocalStorageItem('accessToken');
      let userId = getLocalStorageItem('userId');

      if (userId && accessToken) {
        dispatch(updateUserAuthInfo(userId, accessToken));
      }
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Route exact path={['/game/:id', '/']} component={Home} />
        <Route path={'/twitch-gaming'} component={TwitchGaming} />
        <Route path={'/youtube-gaming'} component={YoutubeGaming} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/email-confirm'} component={EmailConfirm} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />
        <Route path='/terms-and-conditions' component={TermsAndConditions} />
      </Router>
    </div>
  );
}

export default App;
