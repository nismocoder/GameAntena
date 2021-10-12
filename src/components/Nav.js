import React, { useState } from "react";
//Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/antena_logo1.svg";
import controllers from "../img/controllers.jpg";
//redux&routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { useAnimatedState } from "framer-motion";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput("");
  };
  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  return (
    <StyledNav>
      {/* <img id="PS4" src={controllers} alt="PS4" /> */}
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Game-Antena!</h1>
      </Logo>
      <form className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 5rem 5rem;
  text-align: center;
  /* background-image: "../img/controllers.jpg"; */
  /* background-image: url("../images/controllers.png"); */
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1.5rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    outline: none;
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: darkblue;
    color: white;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }
  img {
    width: 50vw;
    height: auto;
    object-fit: contain;
    background-size: cover;
    position: "absolute";
  }
  /* img {
    width: 100vw;
    height: auto;
    object-fit: cover;
    background-size: contain;
    position: "absolute";
  } */
`;

// PS4 = styled(motion.div)`
//   width: 100vw;
//   height: auto;
//   object-fit: cover;
//   background-size: contain;
//   position: "absolute";
// `;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
  font-size: 1.5rem;
  img {
    height: 3rem;
    width: 3rem;
  }
`;

export default Nav;
