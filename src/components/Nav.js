import React, { useState } from "react";
//Animation
import styled from "styled-components";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import logo from "../img/logo/antena_logo1.svg";
//redux&routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
//icons
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    // setTextInput("");
  };
  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  const closeSearch = () => {
    setTextInput("");
    setShowSearch(false);
  }

  return (
    <StyledNav>
      <div className="icon">
        <FontAwesomeIcon icon={faBars} />
      </div>
      {!showSearch && (
        <Link to={'/'}>
          <Logo
            onClick={clearSearched}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <img src={logo} alt="logo" />
            <h1 className="logo-text">Game-Antena</h1>
          </Logo>
        </Link>

      )}
      <div className="icon search">
        {!showSearch ?
          <FontAwesomeIcon icon={faSearch} onClick={() => setShowSearch(true)} />
          : (
            <AnimatePresence>
              <StyledSearch
                onSubmit={submitSearch}
                className="search-input"
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: '0%', opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon
                  className="close-icon"
                  icon={faTimes}
                  onClick={closeSearch}
                />
                <input
                  placeholder="Search a game.."
                  value={textInput}
                  onChange={inputHandler}
                  type="text"
                />
              </StyledSearch>
            </AnimatePresence>
          )
        }
      </div>
    </StyledNav >
  );
};

const StyledNav = styled(motion.nav)`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  text-align: center;
  background-color: var(--primary);
  color: var(--light-1);
  z-index: 4;

  .icon {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const StyledSearch = styled(motion.form)`
  width: 90%;
  text-align: left;
  margin-left: auto;
  position: relative;
  border-radius: 50rem;
  background-color: var(--light);
  padding: 0.3rem 1rem;  

  .close-icon {
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-light);
    font-size: 1.5rem;
  }

  input {
    width: 85%;
    font-size: 1.2rem;
    border: none;
    outline: none;
    background: none;
  }
  
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
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  cursor: pointer;

  img {
    height: 1.5rem;
    width: 1.5rem;
  }

  .logo-text {
    font-family: 'Kaufhalle';
    letter-spacing: 1px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.15rem;
  }
`;

export default Nav;
