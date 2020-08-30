import React, { useEffect } from "react";


// Used just to redirect the window.location because before the site had an option where you could choose between 2 themes which is now disabled and thats why we need this

const Home = () => {
  useEffect(() => {
    window.location = "/bT/popular";
  });
  return <div></div>;
}

export default Home;
