import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { phonebookOperations, phonebookSelectors } from 'redux/phonebook';
import showMessage from 'services/showMessage';
import styles from './ContactForm.module.css';

const INITIAL_FORM_LOCAL_STATE = { name: '', number: '' };

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(phonebookSelectors.getContactsItems);
  const isLoading = useSelector(phonebookSelectors.getLoadingStatus);

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error('Unknown input field name');
    }
  };

  const resetForm = () => {
    setName(INITIAL_FORM_LOCAL_STATE.name);
    setNumber(INITIAL_FORM_LOCAL_STATE.number);
  };

  const addContact = (name, number) => dispatch(phonebookOperations.postContact({ name, number }));

  const handleSubmit = e => {
    e.preventDefault();

    const isContactAlreadySaved = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
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
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
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
