import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
      style={{
        width: "100%",
      }}
    />
    <Link to="/login" className="link-login">
      Login
    </Link>
  </div>
);

export default NotFound;
