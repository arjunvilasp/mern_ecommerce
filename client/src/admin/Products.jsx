import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>All Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} style={{ width: '200px' }} />
              <p>{product.description}</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p>Gender: {product.gender}</p>
              <p>Price: ${product.price}</p>
              <p>In Stock: {product.countInStock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
