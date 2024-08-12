import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/banner.css";

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      const response = await axios.get("http://localhost:5000/api/banner");
      console.log(response);
      setBannerData(response.data);
      setTimeLeft(response.data.timer);
    };
    fetchBannerData();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      <div className="navbar">
        <Link to="/dashboard">Go to dashboard</Link>
      </div>
      {
      bannerData && bannerData.is_visible && 
      <div className="banner">
        <p>{bannerData.description}</p>
        <p>
          Time left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
        <a href={bannerData.link} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
        <hr />
      </div>
}
    </>
  );
};

export default Banner;
