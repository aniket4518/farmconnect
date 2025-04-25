import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../productList/ProductList";
import "../../../styles/ProductList.module.css";

const Product = () => {
    const {products} = useContext(GlobalState);
    
    return (
        <>
            {
                
                !Array.isArray(products) || products.length === 0 ? (
                    <h1>No Products Available</h1>
                ) : (
                    products.map((product,index) => {
                        return <ProductList key={product._id} product={product} />;
                    })
                )
            }
        </>
    );
};

export default Product;