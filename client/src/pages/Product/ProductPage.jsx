import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";
import useGetProductByid from '../../hooks/useGetProductById.js'
import Loader from '../../components/Loader/Loader.jsx'
import { Toaster } from "react-hot-toast";
import useCart from "../../hooks/useCart.js";
import { useAuthContext } from "../../context/authContext.jsx";


const ProductPage = () => {

  const {product_id} = useParams();

  const { addToCart } = useCart();

  const {authUser} = useAuthContext();

  const navigate = useNavigate();
  
  const {loading,product} = useGetProductByid(product_id);

  const handleAddToCart = (productId) => {
    if(authUser){
      addToCart(productId);
    }else{
      navigate('/login')
    }
  }

  if(loading){
    return <Loader/>
  }

  return (
    <div className="product-page">
    <div className="product-page-container">
      <div className="product-img">
        <img src={product.image} alt="product-image" />
      </div>
      <div className="product-overview">
        <h1 className="name"><b>{product.name}</b></h1>
        <h3 className="price">₹{product.price}</h3>
        <button onClick={()=>handleAddToCart(product._id)}>ADD TO CART</button>
        <p className="product-desc">
            <b>Product Description</b><br/>
          {
            product.description
          }
        </p>
      </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default ProductPage;
