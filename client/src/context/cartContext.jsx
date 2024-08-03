import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
