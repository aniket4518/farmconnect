import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping, FaBars, FaXmark, FaUser } from "react-icons/fa6";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdStore } from "react-icons/md";
import { GlobalState } from "../../GlobalState";

const Header = () => {
    const { cart = [], logoutUser } = useContext(GlobalState);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logoutUser();
    };

    // Calculate total items in cart including quantities
    const cartItemCount = Array.isArray(cart) 
        ? cart.reduce((total, item) => total + (item.quantity || 1), 0)
        : 0;    return (
        <header style={{
            height: "80px",
            width: "100%",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(64,185,89,0.07)",
            display: "flex",
            alignItems: "center",
            padding: isMobile ? "0 15px" : "0 20px",
            zIndex: 100,
            position: "sticky",
            top: 0
        }}>
            {/* Logo */}
            <div style={{ 
                fontWeight: 800, 
                fontSize: isMobile ? "1.8rem" : "2.2rem", 
                color: "#40b959", 
                letterSpacing: "-1px", 
                marginRight: "auto"
            }}>
                <Link to="/" style={{ color: "#40b959", textDecoration: "none" }}>FarmConnect</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                    display: isMobile ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "2px solid #40b959",
                    borderRadius: "8px",
                    padding: "8px",
                    fontSize: "1.2rem",
                    color: "#40b959",
                    cursor: "pointer",
                    marginRight: "0px",
                    width: "40px",
                    height: "40px",
                    transition: "all 0.2s ease"
                }}
            >
                {mobileMenuOpen ? <FaXmark /> : <FaBars />}
            </button>

            {/* Desktop Navigation */}
            <nav style={{ 
                display: isMobile ? "none" : "flex", 
                alignItems: "center", 
                gap: "20px"
            }}>
                <ul style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                    margin: 0,
                    padding: 0,
                    listStyle: "none"
                }}>
                    <li>
                        <Link to="/" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none" }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/products" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none" }}>Products</Link>
                    </li>
                    <li>
                        <Link to="/pricing" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none" }}>Pricing</Link>
                    </li>
                    <li>
                        <Link to="/about" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none" }}>About</Link>
                    </li>
                </ul>
                
                {/* Search Bar - Desktop */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    marginLeft: "20px" 
                }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        style={{
                            width: isMobile ? "180px" : "260px",
                            padding: "10px 18px",
                            borderRadius: "20px",
                            border: "1px solid #e0e0e0",
                            background: "#f9fbe7",
                            color: "#222",
                            fontSize: "1rem",
                            outline: "none",
                            transition: "border 0.2s"
                        }}
                    />
                </div>

                {/* Cart Icon */}
                <div style={{ position: "relative", marginLeft: "20px" }}>
                    <Link to="/cart" style={{ position: "relative", textDecoration: "none" }}>
                        <FaCartShopping size={24} color="#40b959" />
                        {cartItemCount > 0 && (
                            <span style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "#40b959",
                                color: "white",
                                borderRadius: "50%",
                                padding: "2px 6px",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                minWidth: "18px",
                                textAlign: "center"
                            }}>
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Login, Register, and Logout Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "20px" }}>
                    <Link 
                        to="/login" 
                        style={{
                            background: "transparent",
                            color: "#40b959",
                            border: "2px solid #40b959",
                            padding: "8px 20px",
                            borderRadius: "25px",
                            fontWeight: 600,
                            fontSize: "1rem",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#40b959";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#40b959";
                        }}
                    >
                        <FiLogIn size={16} />
                        Login
                    </Link>
                    
                    <Link 
                        to="/register" 
                        style={{
                            background: "#40b959",
                            color: "white",
                            border: "2px solid #40b959",
                            padding: "8px 20px",
                            borderRadius: "25px",
                            fontWeight: 600,
                            fontSize: "1rem",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#369649";
                            e.target.style.borderColor = "#369649";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "#40b959";
                            e.target.style.borderColor = "#40b959";
                        }}
                    >
                        <MdStore size={16} />
                        Continue as Farmer
                    </Link>
                    
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "transparent",
                            color: "#dc3545",
                            border: "2px solid #dc3545",
                            padding: "8px 20px",
                            borderRadius: "25px",
                            fontWeight: 600,
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#dc3545";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#dc3545";
                        }}
                    >
                        <FiLogOut size={16} />
                        Logout
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && isMobile && (
                <div style={{
                    position: "fixed",
                    top: "80px",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    padding: "20px",
                    zIndex: 9999,
                    maxHeight: "calc(100vh - 80px)",
                    overflowY: "auto",
                    borderTop: "1px solid #eee"
                }}>
                    <ul style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}>
                        <li>
                            <Link 
                                to="/" 
                                style={{ 
                                    color: "#222", 
                                    fontWeight: 600, 
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    display: "block",
                                    padding: "10px 0",
                                    borderBottom: "1px solid #eee"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/products" 
                                style={{ 
                                    color: "#222", 
                                    fontWeight: 600, 
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    display: "block",
                                    padding: "10px 0",
                                    borderBottom: "1px solid #eee"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/pricing" 
                                style={{ 
                                    color: "#222", 
                                    fontWeight: 600, 
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    display: "block",
                                    padding: "10px 0",
                                    borderBottom: "1px solid #eee"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                style={{ 
                                    color: "#222", 
                                    fontWeight: 600, 
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    display: "block",
                                    padding: "10px 0",
                                    borderBottom: "1px solid #eee"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <input
                                type="text"
                                placeholder="Search products..."
                                style={{
                                    width: "100%",
                                    padding: "12px 18px",
                                    borderRadius: "20px",
                                    border: "1px solid #e0e0e0",
                                    background: "#f9fbe7",
                                    color: "#222",
                                    fontSize: "1rem",
                                    outline: "none",
                                    marginTop: "10px",
                                    boxSizing: "border-box"
                                }}
                            />
                        </li>
                        <li style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                            <Link 
                                to="/cart" 
                                style={{ 
                                    color: "#222", 
                                    fontWeight: 600, 
                                    fontSize: "1.1rem",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    position: "relative"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FaCartShopping style={{ marginRight: "10px", fontSize: "1.2rem", color: "#40b959" }} />
                                Cart
                                {cartItemCount > 0 && (
                                    <span style={{
                                        marginLeft: "10px",
                                        background: "#40b959",
                                        color: "white",
                                        borderRadius: "50%",
                                        padding: "2px 8px",
                                        fontSize: "0.8rem",
                                        fontWeight: "bold"
                                    }}>
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li style={{ borderTop: "1px solid #eee", paddingTop: "15px", marginTop: "10px" }}>
                            <Link 
                                to="/login" 
                                style={{
                                    background: "transparent",
                                    color: "#40b959",
                                    border: "2px solid #40b959",
                                    padding: "12px 20px",
                                    borderRadius: "25px",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    marginBottom: "10px"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FiLogIn size={16} /> Login
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/register" 
                                style={{
                                    background: "#40b959",
                                    color: "white",
                                    border: "2px solid #40b959",
                                    padding: "12px 20px",
                                    borderRadius: "25px",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <MdStore size={16} /> Continue as Farmer
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                style={{
                                    background: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    padding: "12px 20px",
                                    borderRadius: "25px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    width: "100%",
                                    marginTop: "10px"
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;