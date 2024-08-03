import { Minus, Plus } from 'lucide-react';
import './QuantityBtn.css';
import useCart from '../../hooks/useCart'
import { useEffect } from 'react';

const QuantityBtn = ({productId,quantity}) => {

  const {fetchCart,incrementItemQuantity,decrementItemQuantity} = useCart();

  useEffect(()=>{
    fetchCart();
  })
 
  return (
    <div className='quantity-btn'>
        <button className='decrement' onClick={()=>decrementItemQuantity(productId)} disabled={quantity <= 1 ? true : false}>
        <Minus size={18} />
      </button>
      <span>{quantity}</span>
      <button id='increment' onClick={()=>incrementItemQuantity(productId)}>
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantityBtn;
