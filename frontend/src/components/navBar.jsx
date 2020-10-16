import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind.macro";

const Nav = styled.nav`
  ${tw` my-10 flex w-4/5 mx-10  justify-center`}
`;

const NavBar = () => {
  return (
    <Nav>
      <NavLink
        exact
        to="/"
        className="mx-6 font-semibold text-grey-darker"
        activeClassName="border-b-2 text-textColor-primary"
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/today"
        className="mx-6 font-semibold text-grey-darker "
        activeClassName="border-b-2 text-textColor-primary"
      >
        Today
      </NavLink>
      <NavLink
        exact
        to="/thisWeek"
        className="mx-6 font-semibold text-grey-darker "
        activeClassName="border-b-2 text-textColor-primary"
      >
        This Week
      </NavLink>
      <NavLink
        exact
        to="/thisMonth"
        className=" mx-6 font-semibold text-grey-darker "
        activeClassName="border-b-2 text-textColor-primary"
      >
        This Month
      </NavLink>
      <Redirect from="/home" to="/"></Redirect>
    </Nav>
  );
};

export default NavBar;
