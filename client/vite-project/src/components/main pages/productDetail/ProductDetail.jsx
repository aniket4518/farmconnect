import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useContext(GlobalState);
    const product = products.find(product => product._id === id);

    if (!product) {
        return <h1>Product not found</h1>;
    }

    return (
        <div className="product_detail">
            <div className="product_img">
                <img src={product.images.url} alt={product.title} />
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price per unit: {product.pricePerUnit}</p>
            <p>Category: {product.category}</p>
        </div>
    );
};

export default ProductDetail;
