import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <section className="footer">
      <div className="title">
        <h1>Zenox</h1>
        <small>Simplicity in Style</small>
      </div>
      <div className="socials">
        <a href="#">
          <FaLinkedin size={25} />
        </a>
        <a href="#">
          <FaFacebook size={25} />
        </a>
        <a href="#">
          <FaXTwitter size={25}/>
        </a>
        <a href="#">
          <FaInstagram size={25} />
          
        </a>
      </div>
      <div className="links">
        <Link to="/about">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
    </section>
  );
};

export default Footer;
