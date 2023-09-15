import Button from '@mui/material/Button';
import { authOperations, authSelectors } from 'redux/auth';
import styles from './UserMenu.module.css';
import { useAppDispatch, useAppSelector } from 'hooks';

const UserMenu: React.FC = () => {
  const userName = useAppSelector(authSelectors.getUserName);
  const userEmail = useAppSelector(authSelectors.getUserEmail);
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
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
