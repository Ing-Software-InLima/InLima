import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export const getUserRole = () => {
  const token = Cookies.get('myToken');
  if (!token) return null;

  try {
    const decoded = jwt.decode(token);
    return decoded.rol;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};