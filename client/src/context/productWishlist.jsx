import React, { createContext, useContext, useState } from 'react';

const ProductWishlistContext = createContext();

export const useWishlistContext = () => {
  return useContext(ProductWishlistContext);
};

export const ProductWishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  return (
    <ProductWishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </ProductWishlistContext.Provider>
  );
};
