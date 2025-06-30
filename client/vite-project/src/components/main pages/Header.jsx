import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdStore } from "react-icons/md";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    // Handle window resize
    React.useEffect(() => {
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
        // Add your logout logic here
        alert("Logged out!");
        navigate("/");
    };

    return (
        <header style={{
            height: "80px",
            width: "100%",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(64,185,89,0.07)",
            display: "flex",
            alignItems: "center",
            padding: window.innerWidth <= 480 ? "0 15px" : "0 20px",
            zIndex: 100,
            position: "sticky",
            top: 0
        }}>
            {/* Logo */}
            <div style={{ 
                fontWeight: 800, 
                fontSize: window.innerWidth <= 480 ? "1.8rem" : "2.2rem", 
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
                    display: isMobile ? "block" : "none",
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    color: "#40b959",
                    cursor: "pointer"
                }}
            >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
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
                        <Link to="/" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem" }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/products" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem" }}>Products</Link>
                    </li>
                    <li>
                        <Link to="/pricing" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem" }}>Pricing</Link>
                    </li>
                    <li>
                        <Link to="/about" style={{ color: "#222", fontWeight: 600, fontSize: "1.1rem" }}>About</Link>
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
                            width: window.innerWidth <= 1024 ? "200px" : "260px",
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

                {/* Account Icon & Dropdown */}
                <div
                    style={{ position: "relative", marginLeft: "32px" }}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <FaUserCircle size={36} color="#40b959" style={{ cursor: "pointer" }} />
                    {showDropdown && (
                        <div style={{
                            position: "absolute",
                            right: 0,
                            top: "48px",
                            background: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 4px 16px rgba(64,185,89,0.13)",
                            minWidth: "180px",
                            zIndex: 10,
                            padding: "10px 0"
                        }}>
                            <Link to="/login" style={dropdownLinkStyle}>
                                <FiLogIn style={{ marginRight: "10px" }} /> Login
                            </Link>
                            <Link to="/register" style={dropdownLinkStyle}>
                                <MdStore style={{ marginRight: "10px" }} /> Become a Seller
                            </Link>
                            <button
                                onClick={handleLogout}
                                style={{
                                    ...dropdownLinkStyle,
                                    background: "none",
                                    border: "none",
                                    width: "100%",
                                    textAlign: "left",
                                    cursor: "pointer"
                                }}
                            >
                                <FiLogOut style={{ marginRight: "10px" }} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && isMobile && (
                <div style={{
                    position: "absolute",
                    top: "80px",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    padding: "20px",
                    zIndex: 1000
                }}>
                    <ul style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
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
                                    padding: "10px 0"
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
                                    padding: "10px 0"
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
                                    padding: "10px 0"
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
                                    padding: "10px 0"
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
                                    marginTop: "10px"
                                }}
                            />
                        </li>
                        <li style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "10px" }}>
                            <Link 
                                to="/login" 
                                style={{
                                    ...dropdownLinkStyle,
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 0"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FiLogIn style={{ marginRight: "10px" }} /> Login
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/register" 
                                style={{
                                    ...dropdownLinkStyle,
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 0"
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <MdStore style={{ marginRight: "10px" }} /> Become a Seller
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

const dropdownLinkStyle = {
    display: "flex",
    alignItems: "center",
    color: "#222",
    padding: "12px 22px",
    fontWeight: 500,
    fontSize: "1rem",
    textDecoration: "none",
    transition: "background 0.2s",
    background: "none"
};

export default Header;
