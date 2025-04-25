import React from "react";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Product from "./product/product";
import Register from "./login/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Pages = () => {
    return (
        <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Product />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default Pages;