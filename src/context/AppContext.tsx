import { useContext, useEffect, useState, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';

import { getUserInfo, isAuthenticated, logout } from '../services/authentication.service';
import { IUserAuthenticated } from '../models/user';

interface IAppContext {
  isOnline: boolean;
  setIsOnline?: (loading: boolean) => void;
  t: any;
  i18n: i18n;
  setAuthenticated: (flag: boolean) => void;
  loggedUser: IUserAuthenticated;
  authenticated: boolean;
  setLoggedUser: (useInfo: IUserAuthenticated) => void;
  handleLogout: () => void;
}

export const AppContext = createContext<IAppContext>(null);

export const AppContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [loggedUser, setLoggedUser] = useState<IUserAuthenticated>(getUserInfo());
  const [isOnline, setIsOnline] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (window?.navigator?.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }

    window.addEventListener('offline', () => {
      console.log('Offline')
      setIsOnline(false);
    });

    window.addEventListener('online', () => {
      console.log('Online')
      setIsOnline(true);
    });
  }, []);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setLoggedUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        t,
        i18n,
        isOnline,
        setIsOnline,
        authenticated,
        setAuthenticated,
        loggedUser,
        setLoggedUser,
        handleLogout
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
