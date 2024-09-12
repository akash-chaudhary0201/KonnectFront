import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:7500/kt/me", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ProfileContext.Provider value={user}>{children}</ProfileContext.Provider>
  );
};
