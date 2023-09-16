import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { authOperations } from 'redux/auth';
import styles from './RegisterPage.module.css';
import { useAppDispatch } from 'hooks';

const INITIAL_FORM_LOCAL_STATE = { name: '', email: '', password: '' };

const RegisterPage = () => {
  const [name, setName] = useState<string>(INITIAL_FORM_LOCAL_STATE.name);
  const [email, setEmail] = useState<string>(INITIAL_FORM_LOCAL_STATE.email);
  const [password, setPassword] = useState<string>(INITIAL_FORM_LOCAL_STATE.password);

  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setName(value);
        break;
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
    setName(INITIAL_FORM_LOCAL_STATE.name);
    setEmail(INITIAL_FORM_LOCAL_STATE.email);
    setPassword(INITIAL_FORM_LOCAL_STATE.password);
  };

  const registerUser = (name: string, email: string, password: string): void => {
    dispatch(authOperations.register({ name, email, password }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    registerUser(name, email, password);
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form action="#" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <TextField
          className={styles.inputField}
          id="name"
          type="text"
          name="name"
          placeholder="Enter username"
          inputProps={{
            pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
          }}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          size="small"
        />
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
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
