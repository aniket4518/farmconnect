import React from "react";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Product from "./product/product";
import Register from "./login/Register";
 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import ProductDetail from "./productDetail/ProductDetail";
import ProductForm from "../Check/ProductForm";
 

const Pages = () => {
    return (
        <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/check" element={<ProductForm/>} />
            <Route path="/products/category/:categoryId" element={<Product />} />
        </Routes>
    );
};

export default Pages;