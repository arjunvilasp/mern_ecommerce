import "./CartPage.css";
import QuantityBtn from "../../components/QuantityBtn/QuantityBtn";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import useCart from "../../hooks/useCart";
import { useEffect } from "react";
import { useCartContext } from "../../context/cartContext";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";

const CartPage = () => {
  const { cart } = useCartContext();

  const { fetchCart, removeFromCart } = useCart();

  const { authUser } = useAuthContext();

  const fetchData = async () => {
    await fetchCart();
  };
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
    fetchData();
  };

  return (
    <div className="cart-page">
      <h1>My Cart</h1>
      <div className="cart-container">
        {
          cart.items.length > 0 ? <>
          <table className="cart-products">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              cart.items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={item.product.image || ""}
                      height={100}
                      width={100}
                      alt={item.product.name || "Product Image"}
                    />
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <QuantityBtn productId={item.product._id} quantity={item.quantity} />
                  </td>
                  <td>{item.quantity * item.price}</td>
                  <td>
                    <IoIosRemoveCircleOutline
                    size={25}
                      cursor={"pointer"}
                      onClick={() => handleRemove(item.product._id)}
                    />
                  </td>
                </tr>
              ))
           }
          </tbody>
        </table>
          <div className="cart-checkout">
            <h2>Order Summary</h2>
            <p className="amount">
              Subtotal<span>₹{cart?.total}</span>
            </p>
            <p className="shipping">
              Shipping<span>₹40</span>
            </p>
            <input type="text" placeholder="Enter Coupon Code here" />
            <button className="checkout-btn">Checkout</button>
          </div>
          </> :
        <h1 style={{color:'#ddd'}}>Your Cart is Empty</h1>
          }
      </div>
      <Toaster />
    </div>
  );
};

export default CartPage;
