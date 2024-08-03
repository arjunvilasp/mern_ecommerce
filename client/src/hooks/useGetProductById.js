import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const useGetProductById = (product_id) => {
    const [loading, setLoading] = useState(false);
    const [product,setProduct] = useState([])

    useEffect(()=>{
        const getProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/product/${product_id}`);
    
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error || 'Something went wrong.');
                }
                setProduct(data);
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    },[])

    return { loading, product };
};

export default useGetProductById;
