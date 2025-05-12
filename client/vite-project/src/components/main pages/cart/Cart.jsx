import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function Cart() {
    const {cart = [], isLoggedIn, addToCart, removeFromCart } = useContext(GlobalState);
    const navigate = useNavigate();

    // Redirect to login if user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // Prevent rendering the cart component while redirecting
    }

    

     
    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            {Array.isArray(cart) && cart.length === 0 ? ( // Ensure cart is an array
                <p>Your cart is empty</p>
            ) : (
                <div className="cart_items">
                    {Array.isArray(cart) && cart.map((item) => ( // Ensure cart is an array before mapping
                        <div key={item._id} className="cart_item">
                            <img src={item.images} alt={item.title} />
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>Price: {item.pricePerUnit}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => addToCart(item)}>Add More</button>
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
            {Array.isArray(cart) && cart.length > 0 && (
                <div className="cart_total">
                    <h2 style={{ color: "black" }}>Total: {cart.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)}</h2>

                </div>
            )}
        </div>
    );
}

export default Cart;