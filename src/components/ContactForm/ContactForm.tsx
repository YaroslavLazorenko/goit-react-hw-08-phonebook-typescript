import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { phonebookOperations, phonebookSelectors } from 'redux/phonebook';
import showMessage from 'services/showMessage';
import styles from './ContactForm.module.css';

const INITIAL_FORM_LOCAL_STATE = { name: '', number: '' };

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>(INITIAL_FORM_LOCAL_STATE.name);
  const [number, setNumber] = useState<string>(INITIAL_FORM_LOCAL_STATE.number);

  const contacts = useAppSelector(phonebookSelectors.getContactsItems);
  const isLoading = useAppSelector(phonebookSelectors.getLoadingStatus);

  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        if (
          value.match("^[a-zA-Zа-яА-ЯёЁіІїЇ '-]+(([' -][a-zA-Zа-яА-ЯёЁіІїЇ ])]*)*$") != null ||
          value === ''
        ) {
          setName(value);
        }
        break;
      case 'number':
        if (value.match('^[0-9()-]*$') != null || value === '') {
          setNumber(value);
        }
        break;
      default:
        throw new Error('ContactForm: Unknown input field name');
    }
  };

  const resetForm = (): void => {
    setName(INITIAL_FORM_LOCAL_STATE.name);
    setNumber(INITIAL_FORM_LOCAL_STATE.number);
  };

  const addContact = (name: string, number: string) =>
    dispatch(phonebookOperations.postContact({ name, number }));

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const isContactAlreadySaved = Boolean(
      contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()),
    );

    if (isContactAlreadySaved) {
      showMessage(`${name} is already in contacts.`);
      return;
    }

    addContact(name, number);
    resetForm();
  };

  return (
    <form className={styles.form} action="#" onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="name">
        Name:
      </label>
      <TextField
        className={styles.inputField}
        id="name"
        type="text"
        name="name"
        placeholder="Enter name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
        size="small"
      />
      <label className={styles.label} htmlFor="number">
        Number:
      </label>
      <TextField
        className={styles.inputField}
        id="number"
        type="tel"
        name="number"
        placeholder="Enter phone"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
        size="small"
      />

      <Button type="submit" disabled={isLoading} variant="outlined">
        Add contact
      </Button>
    </form>
  );
};

export default ContactForm;
