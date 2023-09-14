import ContactItem from '../ContactItem';
import { phonebookSelectors } from 'redux/phonebook';
import styles from './ContactList.module.css';
import { useAppSelector } from 'hooks';

const ContactList: React.FC = () => {
  const filteredContacts = useAppSelector(phonebookSelectors.getFilteredContactsItems);

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => {
        return <ContactItem contact={contact} key={contact.name} />;
      })}
    </ul>
  );
};

export default ContactList;
