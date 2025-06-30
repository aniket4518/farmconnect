import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function Cart() {
    const {cart = [], isLoggedIn, addToCart, removeFromCart } = useContext(GlobalState);
    const navigate = useNavigate();
    
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

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
        <div className="cart" style={{ 
            padding: isMobile ? '15px' : '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h1 style={{ 
                color: "black", 
                textAlign: "center",
                fontSize: isMobile ? '24px' : '32px',
                marginBottom: '30px'
            }}>Your Shopping Cart</h1>
            
            {Array.isArray(cart) && cart.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '50px 20px',
                    color: '#666'
                }}>
                    <p style={{ fontSize: '18px' }}>Your cart is empty</p>
                    <button 
                        onClick={() => navigate('/products')}
                        style={{
                            backgroundColor: '#40b959',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '20px'
                        }}
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <>
                    {/* Desktop View */}
                    {!isMobile ? (
                        <div className="cart_items">
                            {/* Heading row */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                padding: "15px 0",
                                borderBottom: "2px solid #ccc",
                                color: "black",
                                backgroundColor: '#f8f9fa'
                            }}>
                                <div style={{ flex: 2 }}>Item</div>
                                <div style={{ flex: 1, textAlign: 'center' }}>Price</div>
                                <div style={{ flex: 1, textAlign: 'center' }}>Quantity</div>
                                <div style={{ flex: 1, textAlign: 'center' }}>Total</div>
                                <div style={{ flex: 1, textAlign: 'center' }}>Actions</div>
                            </div>
                            {/* Cart items */}
                            {Array.isArray(cart) && cart.map((item) => (
                                <div key={item._id} className="cart_item" style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    borderBottom: "1px solid #eee", 
                                    padding: "15px 0" 
                                }}>
                                    <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                                        <img 
                                            src={item.images} 
                                            alt={item.name} 
                                            style={{ 
                                                width: "80px", 
                                                height: "80px", 
                                                objectFit: "cover", 
                                                marginRight: "15px",
                                                borderRadius: '8px'
                                            }} 
                                        />
                                        <div>
                                            <h3 style={{ margin: 0, color: "black", fontSize: '16px' }}>{item.name}</h3>
                                            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>{item.description}</p>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, color: "black", textAlign: "center", fontWeight: 'bold' }}>
                                        ₹{item.pricePerUnit}
                                    </div>
                                    <div style={{ flex: 1, color: "black", textAlign: "center", fontSize: '16px' }}>
                                        {item.quantity}
                                    </div>
                                    <div style={{ flex: 1, color: "black", textAlign: "center", fontWeight: 'bold' }}>
                                        ₹{item.pricePerUnit * item.quantity}
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                        <button 
                                            onClick={() => addToCart(item)} 
                                            style={{
                                                backgroundColor: '#40b959',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px'
                                            }}
                                        >
                                            +
                                        </button>
                                        <button 
                                            onClick={() => removeFromCart(item._id)} 
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Mobile View */
                        <div className="cart_items_mobile">
                            {Array.isArray(cart) && cart.map((item) => (
                                <div key={item._id} className="cart_item_mobile" style={{ 
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    marginBottom: '15px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}>
                                    <div style={{ display: 'flex', marginBottom: '15px' }}>
                                        <img 
                                            src={item.images} 
                                            alt={item.name} 
                                            style={{ 
                                                width: isSmallMobile ? "60px" : "80px", 
                                                height: isSmallMobile ? "60px" : "80px", 
                                                objectFit: "cover", 
                                                marginRight: "15px",
                                                borderRadius: '8px'
                                            }} 
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ 
                                                margin: 0, 
                                                color: "black", 
                                                fontSize: isSmallMobile ? '16px' : '18px',
                                                lineHeight: '1.3'
                                            }}>
                                                {item.name}
                                            </h3>
                                            <p style={{ 
                                                margin: '5px 0 0 0', 
                                                color: '#666', 
                                                fontSize: isSmallMobile ? '12px' : '14px',
                                                lineHeight: '1.4'
                                            }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ 
                                        display: 'grid',
                                        gridTemplateColumns: isSmallMobile ? '1fr 1fr' : '1fr 1fr 1fr',
                                        gap: '15px',
                                        marginBottom: '15px',
                                        fontSize: '14px'
                                    }}>
                                        <div>
                                            <strong style={{ color: '#666' }}>Price:</strong>
                                            <br />
                                            <span style={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                                                ₹{item.pricePerUnit}
                                            </span>
                                        </div>
                                        <div>
                                            <strong style={{ color: '#666' }}>Quantity:</strong>
                                            <br />
                                            <span style={{ color: 'black', fontSize: '16px' }}>
                                                {item.quantity}
                                            </span>
                                        </div>
                                        {!isSmallMobile && (
                                            <div>
                                                <strong style={{ color: '#666' }}>Total:</strong>
                                                <br />
                                                <span style={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                                                    ₹{item.pricePerUnit * item.quantity}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {isSmallMobile && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <strong style={{ color: '#666' }}>Total:</strong>
                                            <span style={{ 
                                                color: 'black', 
                                                fontSize: '18px', 
                                                fontWeight: 'bold',
                                                marginLeft: '10px'
                                            }}>
                                                ₹{item.pricePerUnit * item.quantity}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div style={{ 
                                        display: 'flex', 
                                        gap: '10px',
                                        justifyContent: isSmallMobile ? 'stretch' : 'flex-start'
                                    }}>
                                        <button 
                                            onClick={() => addToCart(item)} 
                                            style={{
                                                backgroundColor: '#40b959',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 16px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                flex: isSmallMobile ? 1 : 'none'
                                            }}
                                        >
                                            Add More
                                        </button>
                                        <button 
                                            onClick={() => removeFromCart(item._id)} 
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 16px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                flex: isSmallMobile ? 1 : 'none'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            
            {Array.isArray(cart) && cart.length > 0 && (
                <div className="cart_total" style={{
                    backgroundColor: '#f8f9fa',
                    padding: isMobile ? '20px' : '25px',
                    borderRadius: '12px',
                    marginTop: '30px',
                    textAlign: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ 
                        color: "black",
                        fontSize: isMobile ? '20px' : '24px',
                        margin: '0 0 20px 0'
                    }}>
                        Total: ₹{cart.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)}
                    </h2>
                    <button style={{
                        backgroundColor: '#40b959',
                        color: 'white',
                        border: 'none',
                        padding: isMobile ? '12px 24px' : '15px 30px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: 'bold'
                    }}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;