import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import ProductDetailScreen from "./screens/ProductDetailScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:id" element={<ProductDetailScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </>
  );
};

export default App;
