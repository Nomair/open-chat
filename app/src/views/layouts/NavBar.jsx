import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "shards-react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { forgetLogin, isLoggedIn, getUserName } from "../../auth";
import "./Navbar.css";

// Similar to componentDidMount and componentDidUpdate:

const LOG_OUT = gql`
  mutation {
    logOut
  }
`;

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [username, setUsername] = useState(null);
  const [logOut] = useMutation(LOG_OUT);
  let history = useHistory();

  useEffect(() => {
    setIsOnline(isLoggedIn());
    setUsername(getUserName());
  }),
    [isLoggedIn()];

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
        {isOnline && (
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
        <span className="user-welcome">Welcome {username} ⭐</span>
      </Nav>
    </>
  );
};

export default Navbar;
