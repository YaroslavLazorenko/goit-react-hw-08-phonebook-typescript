import TextField from '@mui/material/TextField';
import { phonebookActions } from 'redux/phonebook';
import { phonebookSelectors } from 'redux/phonebook';
import styles from './Filter.module.css';
import { useAppDispatch, useAppSelector } from 'hooks';

const Filter: React.FC = () => {
  const filter = useAppSelector(phonebookSelectors.getContactsFilter);
  const dispatch = useAppDispatch();

  return (
    <>
      <p className={styles.title}>Find contacts by name</p>
      <TextField
        className={styles.inputField}
        type="text"
        name="filter"
        placeholder="Enter name"
        value={filter}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(phonebookActions.changeFilter(e.target.value))}
        size="small"
      />
    </>
  );
};

export default Filter;
