import { ChevronDown } from "lucide-react";
import "./SubNavbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const SubNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="sub-nav">
      <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/about">About</Link>
        <Link className="link" to="/contact-us">Contact</Link>
        <div
          className="category-drop_down"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="flex">
            Category <ChevronDown />
          </span>
          {isHovered && (
            <div className="drop_down-list">
              <Link to={`/category/Men`}>Men</Link>
              <Link to={`/category/Women`}>Women</Link>
              <Link to={`/category/Boys`}>Boys</Link>
              <Link to={`/category/Girls`}>Girls</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
