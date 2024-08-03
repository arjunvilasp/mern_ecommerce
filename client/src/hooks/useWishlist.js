import axios from "axios";
import { useWishlistContext } from "../context/productWishlist";
import toast from 'react-hot-toast';

const useWishlist = () => {

    const {wishlist,setWishlist} = useWishlistContext();


      const fetchWishlist = async () => {
        try {
          const response = await axios.get(`/api/users/wishlist`,{ withCredentials: true });
          setWishlist(response.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
    
      const addToWishlist = async (productId) => {
        try {
          let data = await axios.post(`/api/users/wishlist`, {productId },{ withCredentials: true });
          setWishlist((prevWishlist) => [...prevWishlist, productId]);
            toast.success(data.data.message)
        } catch (error) {
          toast.error('Error adding to wishlist:', error);
        }
      };
    
      const removeFromWishlist = async (productId) => {
        try {
          await axios.delete(`/api/users/wishlist/${productId}`,{ withCredentials: true });
          setWishlist((prevWishlist) => prevWishlist.filter(id => id !== productId));
          toast.success("Product removed from wishlist.")
        } catch (error) {
          toast.error('Error removing from wishlist:', error);
        }
      };
    return { fetchWishlist, addToWishlist, removeFromWishlist}
}

export default useWishlist