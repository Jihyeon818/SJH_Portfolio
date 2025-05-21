import React from 'react';
import { FaGithub } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Jihyeon Portfolio</h1>
        <nav className="nav">
          <a href="#about">About me</a>
          <a href="#projects">Projects</a>
          <a href="#career">Career</a>
        </nav>
        <section>
          <a href="https://github.com/Jihyeon818"><FaGithub /> 깃허브</a>
        </section>
      </div>
    </header>
  );
}

export default Header;
