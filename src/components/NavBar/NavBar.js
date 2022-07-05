import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../movielogo.png";
import s from "./Navbar.module.css";

export default function NavBar() {
  return (
    <header className={s.navbar}>
      <div>
        <NavLink to="/">
          <img
            id="logoHenry"
            src={Logo}
            width="30"
            height="30"
            className={s.img}
            alt=""
          />
        </NavLink>
      </div>

      <div className={s.moviesapp}>Movies APP</div>

      <div className={s.hf}>
        <NavLink exact to="/" color="white" className={s.home}>
          Home
        </NavLink>
        <NavLink to="/favs" className={s.fav}>
          Favorites
        </NavLink>
      </div>
    </header>
  );
}
