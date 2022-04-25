import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import Login from "./pages/login/Login";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});
  onAuthStateChanged(auth, (current) => {
    //console.log("current user from useAuth", current);
    setCurrentUser(current);
  });
  return currentUser ? true : false;
};

const ProtectedRoutes = () => {
  const logged = useAuth();
  useEffect(() => {
    return () => {};
  }, []);
  return logged ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
