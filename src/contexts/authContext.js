import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({});

    const logout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({ username: "", id: 0, status: false });
    };
  
    useEffect(() => {
      axios.get("https://covid19trackeromarnodo.cyclic.app/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then((response) => {
          if (response.data.error) {
            setAuthState({ ...authState, status: false });
          } else {

            setAuthState({
              name: response.data.name,
              id: response.data.id,
              status: true,
            });
          }
        });
    }, []);

    return (
      <AuthContext.Provider
        value={{
          authState, setAuthState,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
};

export default AuthContext;