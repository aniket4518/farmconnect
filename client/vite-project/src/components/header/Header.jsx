import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GlobalState } from "../../GlobalState";
import styles from '../../styles/Header.module.css';

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
                <li className={styles.li1}><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/about">About</Link></li>
                <li className={styles.logo}> 
                    <Link to="/">farmerConnect</Link>       
                </li> 
                <li>
                    <input className={styles.search} type="text" placeholder="  Search for products, brands and more" />
                </li>
                <li className="cart">
                    <Link to="/cart">
                        <FaCartShopping />
                        <span>{cartItemCount}</span>
                    </Link>
                </li>
                <li>
                  <Link to="/login">  <button className={styles.bt2}> Sign In</button></Link>
                </li>
                <li>
                 <Link to="/register"> <button className={styles.bt2}> BECAME A SELLER </button></Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </header>
    );
}

export default Header;