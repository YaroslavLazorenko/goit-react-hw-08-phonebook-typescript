import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { phonebookOperations, phonebookSelectors } from 'redux/phonebook';
import styles from './ContactItem.module.css';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(phonebookSelectors.getLoadingStatus);

  return (
    <li className={styles.contactItem}>
      <span className={styles.contactText}>
        {contact.name}: {contact.number}
      </span>
      <Button
        onClick={() => dispatch(phonebookOperations.deleteContact(contact.id))}
        disabled={isLoading}
        variant="contained"
        size="small"
      >
        Delete
      </Button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default ContactItem;
