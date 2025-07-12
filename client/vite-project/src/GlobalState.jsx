import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "./config";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // Only use useState, not localStorage
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [accessToken, setAccessToken] = useState(null);
  
    // Fetch cart from server on login

    // Add item to cart and sync to server
    const addToCart = (item) => {
        if (!isLoggedIn || !accessToken) {
            console.error("User is not logged in or accessToken missing. Cannot add to cart.");
            return;
        }
        setCart((prevCart) => {
            const safeCart = Array.isArray(prevCart) ? prevCart : [];
            const existing = safeCart.find((cartItem) => cartItem._id === item._id);
            let updatedCart;
            if (existing) {
                updatedCart = safeCart.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCart = [...safeCart, { ...item, quantity: 1 }];
            }
            // Sync to server
            axios.patch(
                `${config.API_BASE_URL}/user/update_cart`,
                { cart: updatedCart },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true,
                }
            ).catch((error) => {
                console.error("Failed to sync cart with server:", error.response?.data || error.message);
            });
            return updatedCart;
        });
    };

    // Remove item from cart and sync to server
    const removeFromCart = (itemId) => {
        if (!isLoggedIn || !accessToken) {
            console.error("User is not logged in or accessToken missing. Cannot remove from cart.");
            return;
        }
        setCart((prevCart) => {
            const updatedCart = (Array.isArray(prevCart) ? prevCart : []).filter((cartItem) => cartItem._id !== itemId);
            // Sync to server
            axios.patch(
                `${config.API_BASE_URL}/user/update_cart`,
                { cart: updatedCart },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true,
                }
            ).catch((error) => {
                console.error("Failed to sync cart with server:", error.response?.data || error.message);
            });
            return updatedCart;
        });
    };
   

    //login
    const loginUser = async (credentials) => {
        try {
            const { data } = await axios.post(`${config.API_BASE_URL}/user/login`, credentials);
            const { accesstoken, user } = data;
            console.log("Login response data:", data);

            if (accesstoken) {
                setAccessToken(accesstoken); // Store token in memory
                setUser(user); // Set user state
                setIsLoggedIn(true); // Update login state
                // Fetch cart after login and set it
                setCart(user.cart || []); // Set cart from user data
                console.log("User logged in successfully.");
                console.log("Access token:", accesstoken);
                console.log(cart);
            } else {
                console.error("No access token received from server.");
            }
        } catch (error) {
            console.error("Error logging in:", error.response?.data || error.message);
            throw error; // So Login.jsx can show alert
        }
    };

    const logoutUser = () => {
        console.log("Logging out user...");
        setAccessToken(null); // Clear token from memory
        setUser(null); // Clear user state
        setIsLoggedIn(false); // Update login state
        setCart([]);
        console.log("User logged out successfully.");
    };

    useEffect(() => {
        // Save login state to localStorage whenever it changes
        if (typeof isLoggedIn === "boolean") {
            localStorage.setItem("isLoggedIn", isLoggedIn);
        }
    }, [isLoggedIn]);
  
    //product
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/product/all`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, []);

    return (
        <GlobalState.Provider
            value={{
                products,
                cart,
                setCart,
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                addToCart,
                removeFromCart,
                loginUser,
                logoutUser,
                accessToken,
    
            }}
        >
            {children}
        </GlobalState.Provider>
    );
};