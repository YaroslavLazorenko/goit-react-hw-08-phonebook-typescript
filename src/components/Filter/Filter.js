import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { phonebookActions } from 'redux/phonebook';
import { phonebookSelectors } from 'redux/phonebook';
import styles from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(phonebookSelectors.getContactsFilter);
  const dispatch = useDispatch();

  return (
    <>
      <p className={styles.title}>Find contacts by name</p>
      <TextField
        className={styles.inputField}
        type="text"
        name="filter"
        placeholder="Enter name"
        value={filter}
        onChange={e => dispatch(phonebookActions.changeFilter(e.target.value))}
        size="small"
      />
    </>
  );
};

export default Filter;
