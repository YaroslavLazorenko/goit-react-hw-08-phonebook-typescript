import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const userName = useSelector(authSelectors.getUserName);
  const userEmail = useSelector(authSelectors.getUserEmail);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(authOperations.logout());
  };

  return (
    <>
      <div className={styles.userMenuContainer}>
        <p className={styles.name}>Hello, {userName}!</p>
        <div className={styles.logoutContainer}>
          <p className={styles.email}>{userEmail}</p>
          <Button type="button" onClick={handleClick} variant="contained">
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
