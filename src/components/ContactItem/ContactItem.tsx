import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { phonebookOperations, phonebookSelectors } from 'redux/phonebook';
import styles from './ContactItem.module.css';

type Props = {
    contact: {
        id: string,
        name: string,
        number: string,
    }
}

const ContactItem: React.FC<Props> = ({ contact: {id, name, number} }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(phonebookSelectors.getLoadingStatus);

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
