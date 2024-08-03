import axios from "axios";
import { useCartContext } from "../context/cartContext";
import toast from 'react-hot-toast';
import { useState } from "react";


const useCart = () => {
  
  const { setCart } = useCartContext();
  const [loading,setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`/api/cart`, { withCredentials: true });
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `/api/cart/add`,
        { productId },
        { withCredentials: true }
      );
      setCart(data);
      toast.success('Item added to cart successfully.');
    } catch (error) {
      toast.error("Error adding to cart:", error);
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/remove/${itemId}`,
        { withCredentials: true }
      );
      toast.success("Item removed from cart.")
    } catch (error) {
      toast.error("Error removing from cart:", error);
    }
  };

  const incrementItemQuantity = async (itemId) => {
    try {
      const { data } = await axios.post(
        `/api/cart/increment`,
        { itemId },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Error incrementing item quantity.");
      console.error("Error incrementing item quantity:", error);
    }
  };

  const decrementItemQuantity = async (itemId) => {
    try {
      const { data } = await axios.post(
        `/api/cart/decrement`,
        { itemId },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Error decrementing item quantity.");
      console.error("Error decrementing item quantity:", error);
    }
  };

  return { fetchCart, addToCart, removeFromCart, incrementItemQuantity, decrementItemQuantity };
};

export default useCart;
