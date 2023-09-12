import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showMessage = (message: string): void => {
  toast(message, { toastId: 'Error-toast' });
};

export default showMessage;
