import { IUserAuthenticated, IUserLogin } from '../models/user';

import { authenticationConstants } from '../constants/general';

const formatUser = (access_token: string, keepConnected: boolean) => {
  return {
    email: 'teste@teste.com',
    name: 'Teste da Silva',
    token: access_token,
    given_name: 'Teste Given Name',
    isAuthentication: true,
    preferred_username: 'Teste Username',
    keepConnected: keepConnected
  };
}

export const login = async (data: IUserLogin): Promise<IUserAuthenticated> => {
  const response = {
    data: {
      access_token: '123456'
    }
  }

  const {
    data: { access_token },
  } = response;

  const user: IUserAuthenticated = formatUser(access_token, data.keepConnected = false);

  localStorage.setItem(authenticationConstants.getUserData, JSON.stringify(user));

  return Promise.resolve(user);
};

export const getUserInfo = (): IUserAuthenticated => {
  if (isAuthenticated()) {
    return JSON.parse(localStorage.getItem(authenticationConstants.getUserData)) as IUserAuthenticated;
  }
  return null;
};

export const logout = () => {
  localStorage.clear();
};

export const isAuthenticated = (): boolean => {
  const jwtToken = localStorage.getItem(authenticationConstants.getUserData);
  return jwtToken !== 'undefined' && jwtToken ? true : false;
};