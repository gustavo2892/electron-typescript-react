import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../utils/useNavigation';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const LayouGlobal = () => {
  const { authenticated, setAuthenticated } = useAppContext();
  const location = useLocation();
  const nav = useNavigation();
  
  useEffect(() => {
    const onUnauthorized = () => {
      setAuthenticated(false);
      nav.goToLogin();
    };
    window.addEventListener('onUnauthorized', onUnauthorized);
    return () => window.removeEventListener('onUnauthorized', onUnauthorized);
  }, []);

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayouGlobal;
