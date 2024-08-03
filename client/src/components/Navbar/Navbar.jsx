import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { ChevronDown, LogOut, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import useLogout from "../../hooks/useLogout";
import { useCartContext } from "../../context/cartContext";
import useCart from "../../hooks/useCart";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { useWishlistContext } from "../../context/productWishlist";
import useWishlist from "../../hooks/useWishlist";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [wishlistVisible, setWishlistVisible] = useState(false);
  const { wishlist } = useWishlistContext();
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const { cart } = useCartContext();
  const { fetchCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const { fetchWishlist } = useWishlist();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const fetchWishlistData = async () => {
    await fetchWishlist();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchData = async () => {
    await fetchCart();
    setCartItems(cart.items.length);
  };

  useEffect(() => {
    if (authUser) {
      fetchData();
    } else {
      setCartItems(0);
    }
  }, [authUser]);

  useEffect(() => {
    if(authUser){
      setCartItems(cart.items.length);
    }
  }, [cart.items]);

  useEffect(() => {
    if(authUser){
      fetchWishlistData();
    }
    return ()=>{
      setWishlistVisible(false);
    }
  }, [wishlist]);

  const handleWishlist = () => {
    if (authUser) {
      setWishlistVisible((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  const searchProduct = (query)=>{
    navigate(`/search/${query}`);
  }

  return (
    <div className="navbar">
      <Link to="/" className="title">
        Zenox
      </Link>
      <div className="nav-options">
        <div className="nav-search">
          <form>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
            />
            <button onClick={()=>searchProduct(query)}>
              <Search size={20} color="grey" />
            </button>
          </form>
        </div>
        <div className="nav-user-options">
          {authUser ? (
            <div
              className="nav-profile"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="flex">
                <User size={18} />
                <span>My Account</span>
                <ChevronDown size={18} />
              </span>
              {isHovered && (
                <div className="drop_down-list">
                  <Link to={`/user-profile/${authUser._id}`}>
                    <span className="flex">
                      <User size={16} color="grey" /> Profile
                    </span>
                  </Link>
                  <button className="flex logout" onClick={logout}>
                    <LogOut size={16} color="grey" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="nav-profile"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="flex">
                <User size={18} />
                <ChevronDown size={18} />
              </span>
              {isHovered && (
                <div className="drop_down-list">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              )}
            </div>
          )}
          <div className="wishlist">
            {!wishlistVisible ? (
              <IoMdHeartEmpty
                size={25}
                cursor={"pointer"}
                color="#666"
                onClick={handleWishlist}
              />
            ) : (
              <IoMdHeart
                size={25}
                cursor={"pointer"}
                color="#666"
                onClick={handleWishlist}
              />
            )}
            <div
              className="wislist-container"
              style={{ display: wishlistVisible && authUser ? "initial" : "none" }}
            >
              {authUser && wishlist.length > 0 ? (
                wishlist.map((item, i) => (
                  <div className="wishlist-item" key={i}>
                    <img src={item.image} height={50} width={50} alt="item" />
                    <p className="item-name">{item.name}</p>
                    <CiSquareRemove
                      size={20}
                      cursor={"pointer"}
                      onClick={() => removeFromWishlist(item._id)}
                    />
                  </div>
                ))
              ) : (
                <img
                  src="/no_item.gif"
                  height={100}
                  width={100}
                  style={{ display: "block", margin: "auto" }}
                  alt="no-item"
                />
              )}
            </div>
          </div>
          <div className="nav-cart">
            <Link to="/cart">
              <ShoppingBag size={20} />
              <span>{cartItems} items</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
