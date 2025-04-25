import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

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
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
