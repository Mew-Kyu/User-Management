import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../../utils/api";
import { headers } from "../../../utils/headers";
import "./userprofile.css";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [newData, setNewData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: res } = await axios.get(
          `${BASE_URL_USER}/user/${userId}`,
          {
            headers,
          }
        );
        setCurrentUser(res);
      } catch (error) {}
    };

    getCurrentUser();
  }, [userId]);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.put(
        `${BASE_URL_USER}/${userId}/update`,
        newData,
        {
          headers,
        }
      );
      console.log(res);
      window.location.href = "/";
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleUpdateUser}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          name="username"
          onChange={handleChange}
        />
      </div>
      <button>Update</button>
    </form>
  );
};

export default UserProfile;
