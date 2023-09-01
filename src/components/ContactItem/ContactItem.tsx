import { useAppDispatch, useAppSelector } from 'hooks';
import Button from '@mui/material/Button';
import { phonebookOperations, phonebookSelectors } from 'redux/phonebook';
import styles from './ContactItem.module.css';

interface ContactItemProps {
    contact: {
        id: string,
        name: string,
        number: string,
    }
}

const ContactItem: React.FC<ContactItemProps> = ({ contact: {id, name, number} }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(phonebookSelectors.getLoadingStatus);

  return (
    <li className={styles.contactItem}>
      <span className={styles.contactText}>
        {name}: {number}
      </span>
      <Button
        onClick={() => dispatch(phonebookOperations.deleteContact(id))}
        disabled={isLoading}
        variant="contained"
        size="small"
      >
        Delete
      </Button>
    </li>
  );
};

export default ContactItem;
