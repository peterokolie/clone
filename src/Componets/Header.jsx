import React from "react";
import "../Style/Header.css";
import { images } from "../Library/images";

import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useStateValue } from "../ContextAPI/StateProvider";
import { auth } from "../FireBase/Firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  function login() {
    if (user) {
      auth.signOut();
    }
  }

  console.log(basket);
  return (
    <nav className="header">
      <Link to="/login">
        <img className="header_logo" src={images.logo} alt="logo" />
      </Link>
      <div className="header_search">
        <SearchIcon className="header_searchIcon" />
        <input
          type="text"
          placeholder="Search products, brands and categories"
          className="header_searchInput"
        />
      </div>
      <button className="search_button">SEARCH </button>
      <div className="header_nav">
        <Link to={!user && "/login"} className="header_link">
          <div onClick={login} className="header_option">
            <span className="header_optionLineOne">
              <AccountCircleOutlinedIcon /> {user?.email}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Login"}
            </span>
          </div>
        </Link>
        <Link to="/login" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne">
              <HelpOutlineOutlinedIcon />
            </span>
            <span className="header_optionLineTwo">Help</span>
          </div>
        </Link>

        <Link to="/checkout" className="header_link">
          <div className="header_optionBasket">
            <span className="header_optionBasket_title">Cart</span>
            <ShoppingCartOutlinedIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;