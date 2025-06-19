import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdStore } from "react-icons/md";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

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
            padding: "0 40px",
            zIndex: 100,
            position: "sticky",
            top: 0
        }}>
            {/* Logo */}
            <div style={{ fontWeight: 800, fontSize: "2.2rem", color: "#40b959", letterSpacing: "-1px", marginRight: "40px" }}>
                <Link to="/" style={{ color: "#40b959", textDecoration: "none" }}>FarmConnect</Link>
            </div>
            {/* Navigation */}
            <nav style={{ flex: 1 }}>
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
            </nav>
            {/* Search Bar */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    style={{
                        width: "260px",
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
