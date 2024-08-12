import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

import { Link } from "react-router-dom";
const Dashboard = () => {
  const [bannerData, setBannerData] = useState({
    is_visible: false,
    description: "",
    timer: 0,
    link: "",
  });

  useEffect(() => {
    const fetchBannerData = async () => {
      const response = await axios.get(
        "https://tuf-assignment-server-2.vercel.app/api/banner"
      );
      setBannerData(response.data);
    };
    fetchBannerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://tuf-assignment-server-2.vercel.app/api/banner",
      bannerData
    );
    alert("Banner updated successfully");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">Go to banner</Link>
      </div>
      <div className="dashboard">
        <h2>Banner Control Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <div className="isVisibleCheckBox">
            <label>Banner Visible</label>
            <input
              type="checkbox"
              name="is_visible"
              checked={bannerData.is_visible}
              onChange={handleInputChange}
            />
          </div>

          <label>
            Description:
            <textarea
              name="description"
              value={bannerData.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Timer (seconds):
            <input
              type="number"
              name="timer"
              value={bannerData.timer}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Link:
            <input
              type="url"
              name="link"
              value={bannerData.link}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update Banner</button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
