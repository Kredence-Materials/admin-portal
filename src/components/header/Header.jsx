import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.header}>
      <Navbar class="header" expand="lg">
        <Navbar.Brand as={Link} to="/" href="#home">
          <img
            src={require("../../assets/logo.png")}
            className={styles.navlogo}
            alt=""
          />
        </Navbar.Brand>

        <Nav.Item style={{ marginLeft: "auto" }}>
          <Nav.Link href="/upload">Upload PDF</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/search">Search PDF</Nav.Link>
        </Nav.Item>
      </Navbar>
    </div>
  );
}

export default Header;
