// backend/controllers/productController.js
import Product from '../models/product.model.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch products by gender
export const getProductsByGender = async (req, res) => {
  
  const { gender } = req.query;

  try {
    // Validate the input
    if (!gender) {
      return res.status(400).json({ message: 'Gender is required' });
    }

    // Find products by gender
    const products = await Product.find({ gender });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
  const { name, image, brand, category, gender, description, price, countInStock } = req.body;

  try {
    const product = new Product({
      name,
      image,
      brand,
      category,
      gender,
      description,
      price,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = async (req, res) => {
  const { name, image, brand, category, gender, description, price, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.gender = gender;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


//Search Products
export const SearchProducts =  async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    
    const products = await Product.find({ 
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { gender: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
