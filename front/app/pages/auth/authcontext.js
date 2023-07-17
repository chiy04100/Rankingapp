import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);


  useEffect(() => {
    const userIdFromCookie = Cookies.get('userId');
    const userIdFromCookie1 = Cookies.get('userName');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    }
    if (userIdFromCookie1) {
      setUserName(userIdFromCookie1);
    }
  }, []);

  const login = (userId, userName) => {
    setUserId(userId);
    setUserName(userName);
    Cookies.set('userId', userId, { expires: 2 });
    Cookies.set('userName', userName, { expires: 2 }); // 7 days
    
  };

  const logout = () => {
    setUserId(null);
    Cookies.remove('userId');
    Cookies.remove('userName');
  };

  return (
    <AuthContext.Provider value={{ userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
