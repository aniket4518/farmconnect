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
            <h1 style={{ color: "black",  alignItems:"center", textAlign:"center" } }> Your Shopping Cart</h1>
            
            {Array.isArray(cart) && cart.length === 0 ? ( // Ensure cart is an array
                <p>Your cart is empty</p>
            ) :

           (
               <div className="cart_items">
                   {/* Heading row */}
                   <div style={{
                       display: "flex",
                       justifyContent: "space-between",
                       fontWeight: "bold",
                       padding: "10px 0",
                       borderBottom: "1px solid #ccc",
                       color: "black"
                   }}>
                       <div style={{ flex: 2 }}>Item</div>
                       <div style={{ flex: 1 }}>Price</div>
                       <div style={{ flex: 1 }}>Quantity</div>
                       <div style={{ flex: 1 }}>Total</div>
                   </div>
                   {/* Cart items */}
                   {Array.isArray(cart) && cart.map((item) => (
                       <div key={item._id} className="cart_item" style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #eee", padding: "10px 0" }}>
                           <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                               <img src={item.images} alt={item.title} style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px" }} />
                               <div>
                                   <h2 style={{ margin: 0, color:"black" }}>{item.name}</h2>
                                   <p style={{ margin: 0 }}>{item.description}</p>
                               </div>
                           </div>
                           <div style={{ flex: 1, color:"black" ,  textAlign:"right" }}>{item.pricePerUnit}</div>
                           <div style={{ flex: 1, color:"black", paddingLeft: "140px" }}>{item.quantity}</div>
                           <div style={{ flex: 1 ,color:"black", paddingLeft: "140px" }}>{item.pricePerUnit * item.quantity}</div>
                           <button onClick={() => addToCart(item)} style={{ marginLeft: "10px" }}>Add More</button>
                           <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: "5px" }}>Remove</button>
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