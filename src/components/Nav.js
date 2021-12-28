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
      <div className="mobile-icon bars">
        <FontAwesomeIcon icon={faBars} />
      </div>
      {!showSearch && (
        <Link to="/">
          <Logo
            className="hoverable"
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
      <div className="mobile-icon search">
        {!showSearch ?
          <FontAwesomeIcon icon={faSearch} onClick={() => setShowSearch(true)} />
          : (
            <StyledSearchMobile
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
            </StyledSearchMobile>
          )
        }
      </div>
      <StyledSearchDesktop
        onSubmit={submitSearch}
        className='desktop'
      >
        <input
          placeholder="Search a game.."
          value={textInput}
          onChange={inputHandler}
          type="text"
        />
        <FontAwesomeIcon
          className="search-icon hoverable"
          icon={faSearch}
          onClick={submitSearch}
        />
      </StyledSearchDesktop>
      <StyledAuth className='desktop'>
        <button className="login hoverable">Login</button>
        <button className="register hoverable">Register</button>
      </StyledAuth>
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

  .desktop {
    display: none;
  }

  /* desktop */
  @media(min-width: 769px) {
    > * {
      flex: 1;
    }

    padding: 1rem 1rem;

    .mobile-icon {display: none}

    .desktop {
      display: flex;
    }
  }
`;

const StyledSearchDesktop = styled(motion.form)`
  position: relative;
  
  .search-icon {
    position: absolute;
    right: -5.2%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: var(--light);
    z-index: 5;
    background-color: var(--shade-2);
    height: 100%;
    width: 10%;
    padding: 0.6rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  input {
    width: 100%;
    font-size: 1.2rem;
    border: none;
    background-color: var(--light);
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
`;

const StyledSearchMobile = styled(motion.form)`
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

const StyledAuth = styled(motion.div)`
  display: flex;
  justify-content: flex-end;

  button {
    padding: 0.5rem 2rem;
    border-radius: 50rem;
    border: none;
    margin-left: 1rem;  
    cursor: pointer;
    font-weight: 600;
    color: var(--light);
  }

  button:hover { 
    filter: brightness(80%);
  }

  .login {
    background-color: var(--shade-4);
  }

  .register {
    background-color: var(--primary);
    border: 2px solid var(--light);
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.1rem;

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
