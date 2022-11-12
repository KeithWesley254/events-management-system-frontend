import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AboutUs from "./pages/AboutUs";
import CreateAnEvent from "./pages/CreateAnEvent";
import Header from "./components/Header";
import SpecificCategory from "./pages/SpecificCategory";
import SpecificEvent from "./pages/SpecificEvent";
import { ThemeState } from "./ThemeContext";

function App() {
  const [user, setUser] = useState({});
  const { bgColor } = ThemeState();

  function setCurrentUser(currentUser) {
    setUser(currentUser);
  }

  function logOut() {
    setUser({});
    localStorage.clear();
    window.location.reload();
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
      .then((user) => setCurrentUser(user));
  }, []);

  return (
    <div style={{backgroundColor: bgColor}}>
      <Header user={user} logOut={logOut} />
      <main>
        <Routes>
          <Route exact="true" path="/" element={<Hero />} />
          {"error" in user ? (
            <Route
              exact="true"
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
          ) : (
            " "
          )}

          <Route
            path="/create-an-event"
            element={<CreateAnEvent setCurrentUser={setCurrentUser} />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/specific-category/:id" element={<SpecificCategory />} />
          <Route path="/specific-event/:id" element={<SpecificEvent />} />
          <Route
            path="/user-profiles/:id"
            element={
              <UserProfile user={user} setCurrentUser={setCurrentUser} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
