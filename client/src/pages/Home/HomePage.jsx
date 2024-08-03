import "./HomePage.css";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import SliderContainer from "../../components/SliderContainer/SliderContainer";
import ProductCard from "../../components/ProductCard/ProductCard";
import useGetProducts from "../../hooks/useGetProducts";
import Loader from "../../components/Loader/Loader";
import { Toaster } from 'react-hot-toast';
import useWishlist from "../../hooks/useWishlist";


const HomePage = () => {

  const {loading, products} = useGetProducts();
  
  return (
    <div className="home-container">
      <SubNavbar />
      <SliderContainer />
      <section className="new-arrivals">
        <h1>New Arrivals</h1>
        {
          loading ? <Loader/> :
        <div className="product-cards">
          { 
          products.map((product) => {
            return <ProductCard key={product._id} product={product}/>;
          })}
        </div>
        }
      </section>
      <Toaster />
    </div>
  );
};

export default HomePage;
