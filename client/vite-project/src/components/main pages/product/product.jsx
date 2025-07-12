import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../productList/ProductList";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import "../../../styles/ProductList.module.css";

const Product = () => {
    const { products: allProducts } = useContext(GlobalState);
    const { categoryId } = useParams();
    const [products, setProducts] = useState(allProducts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            axios
                .get(`${config.API_BASE_URL}/product/bycategory?category=${categoryId}`)
                .then(res => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setProducts([]);
                    setLoading(false);
                });
        } else {
            setProducts(allProducts);
        }
    }, [categoryId, allProducts]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            {
                !Array.isArray(products) || products.length === 0 ? (
                    <h1>No Products Available</h1>
                ) : (
                    products.map((product) => (
                        <ProductList key={product._id} product={product} />
                    ))
                )
            }
        </>
    );
};

export default Product;