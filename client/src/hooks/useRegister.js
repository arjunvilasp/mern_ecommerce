import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/authContext.jsx";
import axios from "axios";

const useRegister = () => {
  const [loading, setLoading] = useState();

  const { setAuthUser } = useAuthContext();

  const register = async ({
    username,
    email,
    password,
    confirmPassword,
    gender,
    street,
    city,
    state,
    postalCode,
    country,
  }) => {
    const validation = validate(
      username,
      email,
      password,
      confirmPassword,
      gender,
      street,
      city,
      state,
      postalCode,
      country
    );

    if (!validation) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `/api/auth/register`,
        {
          username,
          email,
          password,
          confirmPassword,
          gender,
          street,
          state,
          city,
          postalCode,
          country,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Registration Successfull.!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

export default useRegister;

const validate = (
  username,
  email,
  password,
  confirmPassword,
  gender,
  street,
  city,
  state,
  postalCode,
  country
) => {
  if (
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender ||
    !street ||
    !city ||
    !state ||
    !postalCode ||
    !country
  ) {
    toast.error("All the fields must be filled!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must have atleast 6 characters");
    return false;
  }

  if (password != confirmPassword) {
    toast.error("Password must be equal..!");
    return false;
  }
  return true;
};
