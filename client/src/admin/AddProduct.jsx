// frontend/src/pages/AddProduct.js
import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      image,
      brand,
      category,
      gender,
      description,
      price,
      countInStock,
    };

    try {
        const response = await fetch('http://localhost:5000/api/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
          

      if (response.status === 201) {
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div>
          <label>Brand</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Count In Stock</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;