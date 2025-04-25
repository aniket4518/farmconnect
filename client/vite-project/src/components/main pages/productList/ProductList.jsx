import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import "../../../styles/ProductList.module.css";

const ProductList = ({ product }) => {
    const { products, addToCart, logoutUser } = useContext(GlobalState); // Destructure logoutUser

    const handleAddToCart = (product) => {
        addToCart(product); // Call addToCart with the selected product
        alert(`${product.name} has been added to the cart!`); // Optional: Show confirmation
    };

    
    return (
        <> 
        <div className="product_box">
          <div className="product_img"> 
           <img src={product.images.url} alt={product.title} />
        </div>
                <h2>
                    <span>{product.name}</span>
                    <p>{product.description}</p>
                    <p>price per unit -{product.pricePerUnit}</p>
                    <p>{product.category}</p>
                </h2>
                <div className="row">
                    
                    <button onClick={() => handleAddToCart(product)}>add to cart</button>
                    <Link to={`/products/${product._id}`}>
                        <button>View More</button>
                    </Link>
                   
                </div>
            </div>
        </>
    );
};

export default ProductList;