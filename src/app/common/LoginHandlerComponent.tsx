import React, { useEffect } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { useNetworkContext } from './context/NetworkContext';

const LoginHandlerComponent: React.FunctionComponent = () => {
  const { saveLoginToken } = useNetworkContext();
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const userStr = searchParams.get('user');
  const errorStr = searchParams.get('error');
  let user: string | null;
  let loginError: string | null;
  try {
    user = userStr && JSON.parse(userStr);
    loginError = errorStr && JSON.parse(errorStr);
  } catch (error) {
    user = null;
    loginError = null;
  }

  useEffect(() => {
    if (loginError) {
      console.log('Authentication error: ', loginError);
    } else if (user) {
      saveLoginToken(user, history); // Will cause a redirect to "/"
    }
  }, [loginError, user, history, saveLoginToken]);

  return user ? null : <Redirect to="/" />;
};

export default LoginHandlerComponent;
