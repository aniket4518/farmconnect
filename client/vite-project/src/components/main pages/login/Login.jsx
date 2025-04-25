import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GlobalState } from "../../../GlobalState";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(GlobalState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/login', user);
            console.log(response.data);
            toast.success("Logged in successfully!");
            setIsLoggedIn(true);
            // Redirect to home page upon successful login
            navigate("/");
        } catch (error) {
            console.error("Error logging in user:", error);
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                // Request was made but no response received
                console.error("Request data:", error.request);
            } else {
                // Something else happened while setting up the request
                console.error("Error message:", error.message);
            }
        }
    };

    return (
        <div> 
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                />
                <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;