import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserInfo = createContext()

export default function UserContext({ children }){
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleSubmitSignUp(e, data, state) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => {
              window.localStorage.setItem("token", JSON.stringify(user.jwt));
              setUser(user.user);
              setLoggedIn(true);
              navigate(state)
            });
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
    }

    function handleSubmitLogin(e, data, state){
        e.preventDefault();
        setIsLoading(true);
        fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => {
            window.localStorage.setItem("token", JSON.stringify(user.jwt));
            setUser(user.user);
            navigate(state)
            });
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
    
        fetch("http://localhost:3000/auto_login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
          .then((r) => r.json())
          .then((user) => setUser(user));
    }, [user]);
    
    function logOut() {
      setUser({});
      localStorage.clear();
      window.location.reload();
    }

    return (
        <div>
            <UserInfo.Provider 
            value={{
                user,
                logOut,
                errors,
                loggedIn,
                isLoading,
                handleSubmitLogin,
                handleSubmitSignUp
            }}>
                {children}
            </UserInfo.Provider>
        </div>
    )
}

export function UserState (){
    return useContext(UserInfo);
}