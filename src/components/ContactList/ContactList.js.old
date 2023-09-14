import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import { phonebookSelectors } from 'redux/phonebook';
import styles from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(phonebookSelectors.getFilteredContactsItems);

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => {
        return <ContactItem contact={contact} key={contact.name} />;
      })}
    </ul>
  );
};

export default ContactList;
