import { getData } from './DB';
import { _VERIFY_TOKEN } from './constantAPI';

const Auth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const user = await getData(_VERIFY_TOKEN);
      console.log(user);
      return user;
    }
  } catch (error) {
    throw error;
  }
};
export { Auth };
