import { useAppSelector } from 'hooks';
import { Navigate } from 'react-router-dom';
import { authSelectors } from 'redux/auth';

interface PublicRouteProps {
  redirectTo: string;
  restricted: boolean;
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/',
  restricted = false,
}) => {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;
