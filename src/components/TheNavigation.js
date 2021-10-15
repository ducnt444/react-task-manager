import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiHomeAlt, BiUser } from "react-icons/bi";

const TheNavigation = () => {
  return (
    <nav>
      <ul className="container1140">
        <li>
          <NavLink
            to="/"
            exact={true}
            className="flex-center"
            activeClassName="active-tab"
          >
            <span className="desktop">Home</span> <BiHomeAlt />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-task"
            className="flex-center"
            activeClassName="active-tab"
          >
            <span className="desktop">
              Add <AiOutlinePlusCircle />
            </span>
            <AiOutlinePlusCircle />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className="flex-center"
            activeClassName="active-tab"
          >
            <span className="desktop">profile</span> <BiUser />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TheNavigation;
