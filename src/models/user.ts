export interface IUserAuthenticated {
  token: string;
  given_name?: string;
  name: string;
  email: string;
  isAuthentication: boolean;
  preferred_username: string;
  keepConnected?: boolean;
}

export interface IUserLogin {
  username: string;
  password: string;
  keepConnected?: boolean;
}