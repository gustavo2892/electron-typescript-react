import { useContext, useEffect, useState, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';

interface IAppContext {
  isOnline: boolean;
  setIsOnline?: (loading: boolean) => void;
  t: any;
  i18n: i18n;
}

export const AppContext = createContext<IAppContext>(null);

export const AppContextProvider = (props) => {
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

  return (
    <AppContext.Provider
      value={{
        t,
        i18n,
        isOnline,
        setIsOnline
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
