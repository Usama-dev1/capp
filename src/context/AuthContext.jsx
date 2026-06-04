import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const AuthContext = createContext(null);

//fn to store users in localstorage
const saveSessionToStorage = (storedUser) => {
  localStorage.setItem("session", JSON.stringify(storedUser));
};

//create auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial data from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      const currentUsers = JSON.parse(storedUsers);
      setUser(currentUsers);
    } else {
      // if no users in local storage create a default admin user
      const admin = [
        {
          id: uuid(),
          email: "admin@gmail.com",
          password: "admin123",
          name: "ADMIN",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ];
      setUser(admin);
      //save the admin to users local storage
      localStorage.setItem("users", JSON.stringify(admin));
    }
    //check if theres a session create a session state
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }

    setLoading(false);
  }, []);

  //when users login
  const login = ({ email, password }) => {
    const storedUsers = localStorage.getItem("users");
    const allUsers = storedUsers ? JSON.parse(storedUsers) : [];
    //validate this user if it is in the storage or not
    const loggedUser = allUsers.find(
      (u) => u.email === email && u.password === password,
    );
    //if user exists dont save password in session
    if (loggedUser) {
      const { password: _, ...sessionUser } = loggedUser;
      setSession(sessionUser);
      saveSessionToStorage(sessionUser);
      return { success: true, user: sessionUser };
    }

    return { success: false, error: "Invalid email or password" };
  };

  //register users
  const register = (newUser) => {
    const { email, password, name } = newUser;
    //validate user in users array
    const userExists = user.find((u) => u.email === email);
    //if email matches give error
    if (userExists) {
      return { success: false, error: "Email already registered" };
    }
    //else create newUser
    const createdUser = {
      id: uuid(),
      email,
      password,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    //update the user state and add the new user to users array
    setUser((prevUsers) => {
      const updatedUsers = [...prevUsers, createdUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    // Handle session dont add password to user session
    const sessionUser = { ...createdUser };
    delete sessionUser.password;
    setSession(sessionUser);
    saveSessionToStorage(sessionUser);

    return { success: true, user: sessionUser };
  };

  //remove the session state and remove the session from localstorage
  const logout = () => {
    setSession(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider
      value={{ user, session, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
