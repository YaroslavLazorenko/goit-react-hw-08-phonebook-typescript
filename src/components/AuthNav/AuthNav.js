import { NavLink } from 'react-router-dom';
import { ROUTES } from 'consts';
import styles from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={styles.container}>
      <NavLink
        to={ROUTES.REGISTER}
        className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
      >
        Sign Up
      </NavLink>
      <NavLink
        to={ROUTES.LOGIN}
        className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
      >
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
