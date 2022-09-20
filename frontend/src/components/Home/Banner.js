import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
const handleSearch = (e, filterItems) => {
  e.preventDefault();
  const searchTerm = e.target.value;
  if(!searchTerm || searchTerm.length < 3) return;

  filterItems(searchTerm, (page) => agent.Items.byTitle(searchTerm, page), agent.Items.byTitle(searchTerm));
}
const Banner = (props) => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className="search-container">  
          <span id="get-part">A place to get</span>
          <form id="search-box-container" onSubmit={(e) => handleSearch(e, props.onSearch)} onChange={(e) => handleSearch(e, props.onSearch)}>
            <input id="search-box" type="text" placeholder="What is it that you truly desire?" />
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
