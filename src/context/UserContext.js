'use client';
import { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to access the UserContext
export const useUserContext = () => useContext(UserContext);

// UserContext provider component
export function UserContextProvider({ children }) {
  const [username, setUsername] = useState('');

  // Function to update the username
  const setLoggedInUser = (username) => {
    setUsername(username);
  };

  return (
    <UserContext.Provider value={{ username, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
