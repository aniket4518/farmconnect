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
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state
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
            justifyContent: isMobile ? "space-between" : "flex-start",
            padding: isMobile ? "0 15px" : "0 20px",
            zIndex: 100,
            position: "sticky",
            top: 0
        }}>
            {/* Logo */}
            <div style={{ 
                fontWeight: 800, 
               paddingRight: "60px",
               paddingLeft: isMobile ? "0" : "10px",
                fontSize: isMobile ? "1.4rem" : "1.8rem", 
                color: "#40b959", 
                letterSpacing: "-1px",
                flex: isMobile ? "0 0 auto" : "0 0 auto"
            }}>
                <Link to="/" style={{ color: "#40b959", textDecoration: "none" }}>FarmConnect</Link>
            </div>

            {/* Mobile Search and Cart - Always Visible */}
            {isMobile && (
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    marginLeft: "auto",
                    marginRight: "12px"
                }}>
                    {/* Mobile Search */}
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                width: "140px",
                                padding: "8px 12px",
                                borderRadius: "20px",
                                border: "1px solid #e0e0e0",
                                background: "#f9fbe7",
                                color: "#222",
                                fontSize: "0.9rem",
                                outline: "none"
                            }}
                        />
                    </div>

                    {/* Mobile Cart */}
                    <div style={{ position: "relative" }}>
                        <Link to="/cart" style={{ position: "relative", textDecoration: "none" }}>
                            <FaCartShopping size={20} color="#40b959" />
                            {cartItemCount > 0 && (
                                <span style={{
                                    position: "absolute",
                                    top: "-8px",
                                    right: "-8px",
                                    background: "#40b959",
                                    color: "white",
                                    borderRadius: "50%",
                                    padding: "2px 6px",
                                    fontSize: "0.7rem",
                                    fontWeight: "bold",
                                    minWidth: "16px",
                                    textAlign: "center"
                                }}>
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            )}

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
                    width: "44px",
                    height: "44px",
                    transition: "all 0.2s ease",
                    zIndex: 1001
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
                <div 
                    className="mobile-menu-override"
                    style={{
                        position: "fixed",
                        top: "80px",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                        padding: "20px",
                        zIndex: "99999 !important",
                        maxHeight: "calc(100vh - 80px)",
                        overflowY: "auto",
                        borderTop: "1px solid #eee",
                        animation: "slideDown 0.3s ease-out",
                        display: "block !important"
                    }}>
                    <style>
                        {`
                            @keyframes slideDown {
                                from {
                                    opacity: 0;
                                    transform: translateY(-10px);
                                }
                                to {
                                    opacity: 1;
                                    transform: translateY(0);
                                }
                            }
                            
                            /* Override CSS module styles for mobile menu */
                            @media screen and (max-width: 768px) {
                                .mobile-menu-override ul {
                                    display: flex !important;
                                    position: static !important;
                                    top: auto !important;
                                    left: auto !important;
                                    width: 100% !important;
                                    background: transparent !important;
                                    box-shadow: none !important;
                                    flex-direction: column !important;
                                }
                                
                                .mobile-menu-override ul li {
                                    display: block !important;
                                    margin: 0 !important;
                                    text-align: left !important;
                                    border-bottom: none !important;
                                    padding: 0 !important;
                                }
                            }
                        `}
                    </style>
                    <ul style={{
                        listStyle: "none !important",
                        margin: "0 !important",
                        padding: "0 !important",
                        display: "flex !important",
                        flexDirection: "column",
                        gap: "15px",
                        position: "static !important",
                        width: "100% !important",
                        background: "transparent !important",
                        boxShadow: "none !important",
                        top: "auto !important",
                        left: "auto !important"
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