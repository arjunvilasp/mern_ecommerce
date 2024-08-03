import axios from 'axios';
import './Category.css';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard';
import { Toaster } from 'react-hot-toast';

const Category = () => {

    const { category } = useParams();
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/category?gender=${category}`)
            setProducts(response.data);
        }
        fetchData();
    },[category])

  return (
    <div className='category'>
        <h1>Showing the products for {category}</h1>
        <div className="products-container">
        {
            products.length > 0 ?
            products.map((item,i)=>(
                <ProductCard key={i} product={item}/>
            )) :
            <h2 style={{color:'#ddd',textAlign:'center'}}>Sorry No Products available right Now..!</h2>
        }
        </div>
        <Toaster/>
    </div>
  )
}

export default Category