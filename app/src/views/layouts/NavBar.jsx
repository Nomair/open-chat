import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "shards-react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { forgetLogin, isLoggedIn } from "../../auth";
import "./Navbar.css";

// Similar to componentDidMount and componentDidUpdate:

const LOG_OUT = gql`
  mutation {
    logOut
  }
`;

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  });
  const [logOut] = useMutation(LOG_OUT);
  let history = useHistory();
  const handleLogout = async () => {
    await logOut();
    forgetLogin();
    history.push("/login");
  };

  return (
    <>
      <Nav className="chat-header">
        <NavItem>
          <NavLink className="xx-large" disabled href="#">
            Chat
          </NavLink>
        </NavItem>
        {loggedIn && (
          <NavItem>
            <NavLink
              className="xx-large"
              href="#"
              onClick={() => handleLogout()}
            >
              Exit
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
