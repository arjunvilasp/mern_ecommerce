import { useState } from 'react'
import toast from 'react-hot-toast';
import {useAuthContext} from '../context/authContext.jsx'
import axios from 'axios'


const useLogin =  () => {
    
    const [loading, setLoading] = useState();

    const {setAuthUser}= useAuthContext();

    const login =  async ({email,password}) =>{
        const validation = validate(email,password);
        
        if(!validation){
            return
        }

        setLoading(true);
        try {

            const response = await axios.post(`/api/auth/login`, 
                { email, password },
                { 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true 
                }
            );

            const data = await response.data;
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem('user',JSON.stringify(data));
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading,login};
}

export default useLogin;


const validate = (email,password) => {
    if(!email || !password ){
        toast.error("All the fields must be filled!")
        return false;
    }
    return true;
}