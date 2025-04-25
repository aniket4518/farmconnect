import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GlobalState } from "../../GlobalState";
import '../../styles/header.module.css';

const Header = () => {
    const { updatedCart = [], logoutUser } = useContext(GlobalState); // Ensure updatedCart is always an array

    const handleLogout = () => {
        logoutUser(); // Call the logoutUser function
    };

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
                        <span>{Array.isArray(updatedCart) ? updatedCart.length : 0}</span> {/* Safely access length */}
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