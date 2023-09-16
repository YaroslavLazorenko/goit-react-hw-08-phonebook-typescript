import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { authOperations } from 'redux/auth';
import styles from './LoginPage.module.css';
import { useAppDispatch } from 'hooks';

const INITIAL_FORM_LOCAL_STATE = { email: '', password: '' };

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>(INITIAL_FORM_LOCAL_STATE.email);
  const [password, setPassword] = useState<string>(INITIAL_FORM_LOCAL_STATE.password);

  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        throw new Error('Unknown input field name');
    }
  };

  const resetForm = (): void => {
    setEmail(INITIAL_FORM_LOCAL_STATE.email);
    setPassword(INITIAL_FORM_LOCAL_STATE.password);
  };

  const loginUser = (email: string, password: string): void => {
    dispatch(authOperations.login({ email, password }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    loginUser(email, password);
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form action="#" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <TextField
          className={styles.inputField}
          id="email"
          type="email"
          name="email"
          placeholder="Enter email"
          title="Must contain valid email address"
          required
          value={email}
          onChange={handleChange}
          size="small"
        />
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <TextField
          className={styles.inputField}
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          inputProps={{
            pattern: '(?=.*[a-z])(?=.*[A-Z]).{8,}',
          }}
          title="Must contain at least one uppercase and lowercase letter, and at least 8 or more characters"
          required
          value={password}
          onChange={handleChange}
          size="small"
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
