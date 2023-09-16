import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { SPINNER } from 'consts';
import { phonebookSelectors } from 'redux/phonebook';
import { phonebookOperations } from 'redux/phonebook';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const contacts = useSelector(phonebookSelectors.getContactsItems);
  const isLoading = useSelector(phonebookSelectors.getLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(phonebookOperations.fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.phonebookTitle}>Phonebook</h1>
      <ContactForm />

      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter />
      {contacts.length !== 0 && <ContactList />}
      <div>
        <ClipLoader color={SPINNER.COLOR} loading={isLoading} size={SPINNER.SIZE} />
      </div>
    </div>
  );
};

export default ContactsPage;
