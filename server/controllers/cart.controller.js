import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const price = product.price;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      // Update quantity and price for existing item
      existingItem.quantity += 1;
    } else {
      // Add new item to cart
      cart.items.push({ product, quantity: 1, price });
    }

    // Recalculate the total price
    cart.calculateTotal();

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};

// Get cart details
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.product",
      select: "name description price image",
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cart" });
  }
};

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  try {
    // Find the cart for the current user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Filter out the item with the specified productId
    const originalLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== itemId
    );
    if (cart.items.length === originalLength) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.total = cart.calculateTotal();

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ error: "Error removing cart item" });
  }
};


// Increment item quantity
export const incrementItemQuantity = async (req, res) => {
  const { itemId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === itemId);
    if (item) {
      item.quantity += 1;
      cart.calculateTotal(); // Calculate total after incrementing quantity
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error incrementing item quantity:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Decrement item quantity
export const decrementItemQuantity = async (req, res) => {
  const { itemId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === itemId);
    if (item) {
      item.quantity = Math.max(1, item.quantity - 1); 
      cart.calculateTotal(); 
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error decrementing item quantity:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
