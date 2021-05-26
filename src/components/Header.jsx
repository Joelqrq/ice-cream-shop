import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`

  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0.75rem;
  background: #296dff;

  .nav-logo {
    height: 3rem;
  }

  .nav-list {
    list-style: none;
  }

  .nav-element {
    display: inline;
    padding: 0.5rem;
    margin-right: 1rem;
    font-family: montserrat;
    font-weight: 500;
    color: #fafcff;
    cursor: pointer;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <img className="nav-logo" src="" alt="logo" />
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-element">This</li>
          <li className="nav-element">This are</li>
        </ul>
      </nav>
    </StyledHeader>
  );
};
