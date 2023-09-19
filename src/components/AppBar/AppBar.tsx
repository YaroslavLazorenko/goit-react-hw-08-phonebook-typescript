import { authSelectors } from 'redux/auth';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import styles from './AppBar.module.css';
import { useAppSelector } from 'hooks';

const AppBar: React.FC = () => {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);

  return <header className={styles.header}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</header>;
};

export default AppBar;
