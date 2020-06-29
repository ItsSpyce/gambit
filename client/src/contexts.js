import { createContext } from 'react';
import cookies from 'js-cookie';

export const UserContext = createContext({
  id: cookies.get('USER_ID'),
  authToken: cookies.get('AUTH_TOKEN'),
});

export const GameContext = createContext({ id: -1 });
