import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GlobalState } from "../../GlobalState";
import '../../styles/Header.module.css';

const Header = () => {
    const { cart = [], logoutUser } = useContext(GlobalState); // Changed from updatedCart to cart

    const handleLogout = () => {
        logoutUser(); // Call the logoutUser function
    };

    // Calculate total items in cart including quantities
    const cartItemCount = Array.isArray(cart) 
        ? cart.reduce((total, item) => total + (item.quantity || 1), 0)
        : 0;

    return (
        <header>
            <ul> 
                <div className="logo">
                    <h1>
                        <Link to="/">farmerConnect</Link>
                    </h1>    
                </div> 
                <input className="search" type="text" placeholder="  Search for products, brands and more" />
                <li className="li1"><Link to="/products">Products</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/about">About</Link></li>
                <li className="cart">
                    <Link to="/cart">
                        <FaCartShopping />
                        <span>{cartItemCount}</span>
                    </Link>
                </li>
                <button className="bt1"><Link to="/login">Sign In</Link></button>
                <button className="bt2"><Link to="/register">BECAME A SELLER</Link></button>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        </header>
    );
}

export default Header;