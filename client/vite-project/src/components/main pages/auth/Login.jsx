import './Login.module.css';
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import farmerImg from '../../../assets/images/farmerlogin.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, loginUser } = useContext(GlobalState); // Use loginUser from context
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            alert("You are already logged in!");
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ email, password }); // Use context loginUser
            navigate("/"); // Redirect to home on success
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login" style={{ 
            background: "linear-gradient(135deg, #e8f5e9 20%, #a5d6a7 100%)", 
            minHeight: "100vh", 
            margin: 0, 
            padding: 0, 
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
        }}>
            <img 
                src={farmerImg} 
                alt="farmer" 
                style={{ 
                    width: "50vw", 
                    height: "100vh", 
                    objectFit: "fill", 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    zIndex: 0, 
                    opacity: 0.25 
                }} 
            />
            <div style={{
                maxWidth: "400px",
                margin: "0 auto",
                marginTop: "80px",
                background: "rgba(255,255,255,0.95)",
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(46,125,50,0.10)",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1 style={{ 
                    textAlign: "center", 
                    margin: "0px 0px 20px 0px", 
                    paddingTop: "0px", 
                    color: "#2e7d32", 
                    fontWeight: 700, 
                    letterSpacing: "1px" 
                }}>Login</h1>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <h2 style={{
                        marginBottom: "8px",
                        fontSize: "20px",
                        color: "#2e7d32",
                        fontWeight: 600,
                        textAlign: "center"
                    }}>Welcome back!</h2>
                    <h2 style={{
                        marginBottom: "24px",
                        marginTop: "0px",
                        fontSize: "16px",
                        color: "#333",
                        fontWeight: 400,
                        textAlign: "center"
                    }}>Please enter your details</h2>

                    <label htmlFor="email" style={{ color: "black", fontWeight: 500, marginBottom: "4px", display: "block" }}>Email</label>
                    <input
                        id="email"
                        style={{
                            marginBottom: "18px",
                            width: "100%",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #bdbdbd",
                            fontSize: "16px",
                            color: "black",
                            background: "#f9fbe7"
                        }}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                    />
                    <label htmlFor="password" style={{ color: "black", fontWeight: 500, marginBottom: "4px", display: "block" }}>Password</label>
                    <input
                        id="password"
                        style={{
                            marginBottom: "24px",
                            width: "100%",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #bdbdbd",
                            fontSize: "16px",
                            color: "black",
                            background: "#f9fbe7"
                        }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <button 
                        type="submit"
                        style={{
                            width: "100%",
                            background: "#43a047",
                            color: "white",
                            padding: "12px",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "18px",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(46,125,50,0.08)",
                            transition: "background 0.2s"
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
