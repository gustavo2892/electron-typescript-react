import { useEffect, useRef } from 'react';
import { Location, NavigateFunction, Params, useLocation, useNavigate, useParams } from 'react-router-dom';
export interface INavigation {
  goToLogin: () => void;
  goToHome: (replace?: boolean) => void;
  location: Location;
  params: Readonly<Params<string>>;
  navigate: NavigateFunction;
}

const useNavigation = (): INavigation => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  /**
   * Keeping url parameters updated storing it
   * in a object reference to avoid closure issues.
   */
  useEffect(() => {
    navigationApi.current['params'] = params;
    navigationApi.current['location'] = location;
  }, [params, location]);

  const navigation = {
    goToLogin: () => navigate('/', { state: { from: navigationApi.current['location'].pathname } }),
    goToHome: (replace = false) => navigate('/home', { replace }),
    goBack: () => navigate((navigation.location?.state as { from: string })?.from ?? '/', { replace: true }),
    location: location,
    params,
    navigate,
  };

  const navigationApi = useRef(navigation);
  return navigationApi.current;
};

export default useNavigation;
