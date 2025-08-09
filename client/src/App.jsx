import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomeScreen from "./components/HomeScreen.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </>
  );
};

export default App;
