import { useAppSelector } from 'hooks';
import { Navigate } from 'react-router-dom';
import { authSelectors } from 'redux/auth';

interface PrivatRouteProps {
  redirectTo: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivatRouteProps> = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
