import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Navbar() {
  let [activeItem, setActiveItem] = useState("");
  let { login, logoutUser, user } = useGlobalContext();
  function handleItemClick({ name }) {
    setActiveItem(name);
  }

  if (!login) {
    return (
      <Menu secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="Register"
          active={activeItem === "friends"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Menu position="right">
          {/* <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item> */}
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    );
  } else {
    return (
      <Menu secondary>
        <Menu.Item
          name={user.username}
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={() => {
              logoutUser();
            }}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
