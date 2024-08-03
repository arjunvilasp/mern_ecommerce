import axios from "axios";
import "./Search.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { query } = useParams(); 

  const fetchProducts = async (searchQuery) => { 
    setLoading(true);
    try {
      const url = `/api/product/search?query=${searchQuery}`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log.error("Search Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProducts(query); 
    }
  }, [query]);

  return (
    <div className="search">
      <h1>Showing the products for {query}</h1>
      <div className="products-container">
        {loading ? (
          <Loader />
        ) : products && products.length > 0 ? (
          products.map((item, i) => <ProductCard key={i} product={item} />)
        ) : (
          <h2 style={{ color: "#ddd", textAlign: "center" }}>
            Sorry No Products available right Now..!
          </h2>
        )}
      </div>
    </div>
  );
};

export default Search;
