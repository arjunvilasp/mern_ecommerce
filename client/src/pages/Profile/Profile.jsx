import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [profileEdit, setProfileEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/api/users/${userId}`,
          { withCredentials: true }
        );
        const data = response.data;
        setUser(data);
        setInputs({
          username: data.username || "",
          email: data.email || "",
          gender: data.gender || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          postalCode: data.postalCode || "",
          country: data.country || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, inputs, {
        withCredentials: true,
      });
      setProfileEdit(false); 
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, { withCredentials: true });
      setUser(response.data);
      toast.success("Profile Updated Successfully.")
    } catch (error) {
      toast.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="profile-container">
        <div className="profile-header">
          <FiEdit
            className="edit-btn"
            size={30}
            onClick={() => setProfileEdit(true)}
          />
        </div>
        <div className="profile-content">
          <div className="profile-pic">
            <img src={user.profilePic} alt="Profile" />
            <div className="img-border"></div>
          </div>
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>
              Location: {user.state}, {user.country}
            </p>
          </div>
        </div>
        <div className="profile-details">
          <h2>Address</h2>
          <div className="address">
            <p>
              {user.street}, {user.city}
            </p>
            <p>
              {user.state}, {user.country}, {user.postalCode}
            </p>
          </div>
        </div>
      </div>
      {profileEdit && user && (
        <div className="profile-edit">
          <IoIosCloseCircleOutline
            className="close-btn"
            size={30}
            onClick={() => setProfileEdit(false)}
          />
          <h2>Update Profile</h2>
          <form onSubmit={handleProfileUpdate}>
            <input
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              placeholder="Name"
            />

            <input
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              placeholder="Email"
            />

            <div className="address">
              <select
                value={inputs.gender}
                onChange={(e) =>
                  setInputs({ ...inputs, gender: e.target.value })
                }
              >
                <option value="null">Select Gender</option>
                <option value="male">Male</option>
                <option value="demale">Female</option>
              </select>
              <input
                type="text"
                value={inputs.street}
                onChange={(e) =>
                  setInputs({ ...inputs, street: e.target.value })
                }
                placeholder="Street"
              />
              <input
                type="text"
                value={inputs.city}
                onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
                placeholder="City"
              />

              <input
                type="text"
                value={inputs.state}
                onChange={(e) =>
                  setInputs({ ...inputs, state: e.target.value })
                }
                placeholder="State"
              />

              <input
                type="text"
                value={inputs.postalCode}
                onChange={(e) =>
                  setInputs({ ...inputs, postalCode: e.target.value })
                }
                placeholder="Postal Code"
              />

              <input
                type="text"
                value={inputs.country}
                onChange={(e) =>
                  setInputs({ ...inputs, country: e.target.value })
                }
                placeholder="Country"
              />
            </div>

            <button type="submit">{loading ? <Loader /> : "Update"}</button>
          </form>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Profile;
