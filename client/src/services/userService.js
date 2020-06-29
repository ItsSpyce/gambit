import axios from 'axios';
import cookies from 'js-cookie';

async function getCurrentUser() {
  try {
    const response = await axios.get('/api/user', {
      validateStatus(status) {
        return status <= 200 || status === 404;
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

async function login(name) {
  try {
    const response = await axios.post('/api/user', { name });
    return response.data;
  } catch (err) {
    return err;
  }
}

async function changeUsername(name) {
  try {
    await axios.put('/api/user', { name });
    return true;
  } catch (err) {
    return false;
  }
}

export default {
  getCurrentUser,
  login,
  changeUsername,
};
