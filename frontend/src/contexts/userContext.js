import { createContext } from "react";

const defaultUser = {
  username: 'Anonymous User',
  statistics: {}
}
const UserContext = createContext(defaultUser);

export const UserProvider = ({ children }) => {

  return (
    <UserContext.Provider value={{

    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
