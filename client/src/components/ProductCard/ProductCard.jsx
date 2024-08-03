import './ProductCard.css';
import { Link, useNavigate } from 'react-router-dom';
import useWishlist from '../../hooks/useWishlist';
import { useEffect, useState } from 'react';
import { useWishlistContext } from '../../context/productWishlist';
import { useAuthContext } from '../../context/authContext';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const ProductCard = ({ product }) => {
  const { addToWishlist } = useWishlist();
  const [productExists, setProductExists] = useState(false);
  const { wishlist } = useWishlistContext();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();


  
  useEffect(() => {
    if (authUser) {
      setProductExists(wishlist.some((item) => item._id === product._id));
    }
  },[wishlist]);

  const handleWishlist = (productId) => {
    if (authUser) {
      addToWishlist(productId);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='product-card'>
      <Link to={`/product/${product._id}`}>
        <div className="product-img">
          <img src={product.image} alt='product-img' />
        </div>
      </Link>
      <div className="product-details">
        <p className='product-name'>{product.name}</p>
        <p className='product-price'><b>₹</b>{product.price}</p>
      </div>
      <button id='wishlist'>
        {
          productExists && authUser ?
            <IoMdHeart color='red' size={22} onClick={() => handleWishlist(product._id)} />
            :
            <IoMdHeartEmpty size={22} onClick={() => handleWishlist(product._id)} />
        }
      </button>
      {/* <button id='addToCart'>
        <ShoppingCart size={22} onClick={() => addToCart(product._id)} />
      </button> */}
    </div>
  );
};

export default ProductCard;
