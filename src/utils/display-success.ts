import { toast } from 'react-toastify';

export function displaySuccessMessage(message: string) {
  return toast.success(message, {
    autoClose: 1000,
  });
}
