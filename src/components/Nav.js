import React, { useState } from "react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../actions/gamesAction";

import {
  faBars,
  faSearch,
  faTimes,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";

import Logo from "./Logo";

const Nav = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const pathname = history.location.pathname;

  const [showSearch, setShowSearch] = useState(false);
  const [textInput, setTextInput] = useState("");

  const ui = useSelector(state => state.ui);
  const { isLoggedIn } = useSelector(state => state.auth)

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (textInput) dispatch(fetchSearch(textInput));
    // setTextInput("");
  };

  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  const closeSearch = () => {
    setTextInput("");
    setShowSearch(false);
  }

  const toggleSideMenu = () => {
    if (!ui.showSideMenu) return dispatch({ type: "SHOW_SIDE_MENU" });
    return dispatch({ type: "HIDE_SIDE_MENU" });
  }

  const getSearchPlaceholder = (path) => {
    if (path === '/') return 'Search a game..'
    if (path === '/twitch-gaming') return 'Search a stream..'
  }

  return (
    <StyledNav>
      <div className="mobile-icon bars hoverable">
        <FontAwesomeIcon onClick={toggleSideMenu} icon={ui.showSideMenu ? faTimes : faBars} />
      </div>
      {!showSearch && (
        <Link to="/">
          <Logo onClick={clearSearched} />
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
              animate={{ width: '90%', opacity: 1 }}
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
          placeholder={getSearchPlaceholder(pathname)}
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
        {!isLoggedIn ? (
          <div>
            <Link to="/login">
              <button className="login hoverable">Login</button>
            </Link>
            <Link to="/register">
              <button className="register hoverable">Register</button>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/" className="hoverable">
              <button className="view-profile">
                View Profile
                <FontAwesomeIcon className="icon" icon={faUser} />
              </button>

            </Link>
            {/* <div className="hoverable logout">
              Logout
              <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
            </div> */}
          </>
        )
        }
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
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;

  .icon {
    margin-left: 0.5rem;
  }

  button {
    padding: 0.5rem 1.5rem;
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

  .view-profile {
    background-color: var(--primary);
    border: 2px solid var(--light);
  }

`;

export default Nav;
