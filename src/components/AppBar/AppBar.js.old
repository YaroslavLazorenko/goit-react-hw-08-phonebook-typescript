import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import styles from './AppBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return <header className={styles.header}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</header>;
};

export default AppBar;
