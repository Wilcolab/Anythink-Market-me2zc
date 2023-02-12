import React, { useEffect, useState } from "react";
import agent from "../../agent";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(searchTerm.length >= 3) {
      props.onTitleSearch(
        searchTerm, 
        (page) => agent.Items.byTitle(searchTerm, page), 
        agent.Items.byTitle(searchTerm)
      );
    }
  }, [searchTerm, props])
  
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className="search-container">
          <span>A place to get</span>
          <form>
            <input id="search-box" type={"text"} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={"What is it that you truly desire?"}/>
          </form>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
