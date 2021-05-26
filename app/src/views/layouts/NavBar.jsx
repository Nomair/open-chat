import React from "react";
import { Nav, NavItem, NavLink } from "shards-react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { forgetLogin } from "../../auth";
const LOG_OUT = gql`
  mutation {
    logOut
  }
`;

const Navbar = () => {
  const [logOut] = useMutation(LOG_OUT);
  let history = useHistory();
  const handleLogout = async () => {
    await logOut();
    forgetLogin();
    history.push("/login");
  };

  return (
    <>
      <Nav>
        <NavItem>
          <NavLink disabled href="#">
            Chat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={() => handleLogout()}>
            Exit
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default Navbar;
