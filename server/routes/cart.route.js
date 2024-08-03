import express from "express";
import {
  addToCart,
  getCart,
  removeCartItem,
  incrementItemQuantity,
  decrementItemQuantity
} from "../controllers/cart.controller.js";
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();

// Add item to cart
router.post("/add", protectRoute, addToCart);

// Get cart details
router.get("/",protectRoute, getCart);

// Remove item from cart
router.delete("/remove/:itemId",protectRoute, removeCartItem);

// Increment item quantity
router.post('/increment', protectRoute, incrementItemQuantity);

// Decrement item quantity
router.post('/decrement', protectRoute, decrementItemQuantity);

export default router;
