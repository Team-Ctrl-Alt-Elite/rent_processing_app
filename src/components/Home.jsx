import { Link } from "react-router-dom";
import { useState } from "react";
import Carousel from "./Carousel";
import "../styles/Home.css";
import "../styles/Carousel.css";

export default function Home() {
  const [hover, setHover] = useState(false);
  const images = [
    "https://res.cloudinary.com/urby-llc/image/upload/f_jpg/SI-Apt-Horizontal_bfq0ew.jpg",
    "https://res.cloudinary.com/urby-llc/image/upload/f_jpg/apartments-desktop2-lowerres_bkwdfu.jpg",
    "https://res.cloudinary.com/urby-llc/image/upload/f_auto/poster_lg_2x_oaudig_lyzlm7",
    "https://res.cloudinary.com/urby-llc/image/upload/f_auto,w_1140/Harrison_hero_new_0830xs_w5k184",
    "https://paramuspost.com/images/library/userfiles/3/Harrison_Urby_The_Study_Works.jpg",
  ];

  return (
    <>
      <div className="home-page">
        <div className="carousel">
          <Carousel images={images} interval={5000} />
          <div
            className={`carousel-overlay ${
              hover ? "carousel-overlay-darken" : ""
            }`}
          ></div>
          <Link
            to="/auth/login"
            className="welcome-text"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? "Click Here to Login" : "Welcome to Tenant Tracker"}
          </Link>
        </div>
      </div>
    </>
  );
}
