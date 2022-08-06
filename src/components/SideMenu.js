import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { faTwitch, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faHome,
  faSignOutAlt,
  faGamepad,
  faAngleDown,
  faAngleRight,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Collapsible, ToolTip } from "./Radix";

import Footer from "./Footer";
import { uiActions } from "../redux/ui";
import { getAuthInfo, removeAccessToken } from "../utils/auth";

function SideMenu() {
  const [showSubLinks, setShowSubLinks] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const ui = useSelector((state) => state.ui);

  const { isLoggedIn } = getAuthInfo();

  const hideSideMenu = () => {
    dispatch(uiActions.HIDE_SIDE_MENU());
  };

  const showSideMenu = () => {
    dispatch(uiActions.SHOW_SIDE_MENU());
  };

  const logoutUser = () => {
    removeAccessToken();
    navigate("/");
  };

  return (
    <>
      <AnimatePresence>
        {!ui.showSideMenu && (
          <StyledMenuDrawer
            onMouseEnter={showSideMenu}
            initial={{ translateX: "-55px" }}
            animate={{ translateX: "0px" }}
            exit={{ translateX: "-55px" }}
            transition={{ duration: 0.3 }}
          >
            <div className="icons">
              <FontAwesomeIcon
                className={`${
                  pathname === "/" || pathname.includes("/games")
                    ? "active"
                    : ""
                }`}
                icon={faHome}
              />
              <FontAwesomeIcon
                className={`${pathname === "/twitch-gaming" ? "active" : ""}`}
                icon={faTwitch}
              />
              <FontAwesomeIcon
                className={`${pathname === "/youtube-gaming" ? "active" : ""}`}
                icon={faYoutube}
              />
              {isLoggedIn && (
                <FontAwesomeIcon
                  className={`${pathname === "/my-profile" ? "active" : ""}`}
                  icon={faUser}
                />
              )}
            </div>
            <div className="logout-icon">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </StyledMenuDrawer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ui.showSideMenu && (
          <StyledSideMenu
            initial={{ translateX: "-288px" }}
            animate={{ translateX: "0px" }}
            exit={{ translateX: "-288px" }}
            transition={{ duration: 0.4 }}
          >
            <div
              role="button"
              tabIndex={0}
              aria-hidden="true"
              onClick={hideSideMenu}
              className="hide-icon hoverable"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <MenuLinks
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="main-links">
                <Link to="/">
                  <ToolTip
                    trigger={
                      <li className={`${pathname === "/" ? "active" : ""}`}>
                        Browse games
                        <FontAwesomeIcon className="icon" icon={faGamepad} />
                      </li>
                    }
                    content={<p>Games from RAWG.IO</p>}
                  />
                </Link>
                <Link to="/twitch-gaming">
                  <ToolTip
                    trigger={
                      <li
                        className={`${
                          pathname === "/twitch-gaming" ? "active" : ""
                        }`}
                      >
                        Twitch Gaming
                        <FontAwesomeIcon className="icon" icon={faTwitch} />
                      </li>
                    }
                    content={<p>Twitch Gaming Streams</p>}
                  />
                </Link>
                <Link to="/youtube-gaming">
                  <ToolTip
                    trigger={
                      <li
                        className={`${
                          pathname === "/youtube-gaming" ? "active" : ""
                        }`}
                      >
                        YouTube Gaming
                        <FontAwesomeIcon className="icon" icon={faYoutube} />
                      </li>
                    }
                    content={<p>YouTube Gaming Streams</p>}
                  />
                </Link>
                {isLoggedIn && (
                  <Link to="/my-profile">
                    <li
                      className={`${
                        pathname === "/my-profile" ? "active" : ""
                      }`}
                    >
                      My Profile
                      <FontAwesomeIcon className="icon" icon={faUser} />
                    </li>
                  </Link>
                )}
              </div>

              <SubLinks className="sub-links">
                <Collapsible
                  open={showSubLinks}
                  trigger={
                    <li>
                      <div
                        role="button"
                        tabIndex={0}
                        aria-hidden="true"
                        className="collapsible-trigger"
                        onClick={() => setShowSubLinks((state) => !state)}
                      >
                        More{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={showSubLinks ? faAngleDown : faAngleRight}
                        />
                      </div>
                    </li>
                  }
                  content={
                    <div className="collapsible-content">
                      <Link to="/about-us">
                        <li
                          className={`${
                            pathname === "/about-us" ? "active" : ""
                          }`}
                        >
                          About Us
                        </li>
                      </Link>

                      <Link to="/privacy-policy">
                        <li>Privacy Policy</li>
                      </Link>

                      <Link to="/terms-and-conditions">
                        <li>Terms and Conditions</li>
                      </Link>
                    </div>
                  }
                />
              </SubLinks>

              {isLoggedIn ? (
                <li>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-hidden="true"
                    className="logout"
                    onClick={logoutUser}
                  >
                    Logout
                    <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                  </div>
                </li>
              ) : (
                <div className="auth">
                  <Link to="/login">
                    <button type="button" className="login rounded">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      type="button"
                      className="register rounded outline-light"
                    >
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </MenuLinks>
            <Footer />
          </StyledSideMenu>
        )}
      </AnimatePresence>
    </>
  );
}

const SideMenuElement = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--primary);
  box-shadow: var(--box-shadow);
  color: var(--light);
`;

const StyledSideMenu = styled(SideMenuElement)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  list-style: none;
  z-index: 4;
  padding-top: 3rem;

  .hide-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    background-color: var(--light);
    color: var(--primary);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

const MenuLinks = styled(motion.div)`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--primary-light);

  ::-webkit-scrollbar-track {
    background: var(--primary);
  }

  ::-webkit-scrollbar {
    width: 0.6rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 50rem;
    background-color: var(--primary-light);
    border: 1px solid #000;
  }

  li {
    width: 100%;
    padding: 1rem 7rem 1rem 1rem;
    cursor: pointer;

    .icon {
      margin-left: 0.5rem;
    }
  }

  li:hover {
    color: var(--light);
    filter: brightness(80%);
  }

  li.active {
    color: var(--light);
    background-color: var(--shade-4);
  }

  li.active:hover {
    filter: brightness(100%);
  }

  .auth {
    padding: 1rem 0;
    display: flex;
    justify-content: space-around;

    button {
      padding: 0.3rem 1.5rem;
      font-weight: 600;
    }
  }

  @media (min-width: 769px) {
    .auth {
      display: none;
    }
  }
`;

const SubLinks = styled.div`
  font-size: 0.9rem;
  color: var(--light-2);

  li {
    cursor: pointer;

    .icon {
      margin-left: 1rem;
    }
  }

  .collapsible-trigger {
    display: flex;
    align-items: center;
  }

  .collapsible-content li {
    padding: 0.5rem 0.65rem 0.5rem 1.5rem;
  }
`;

const StyledMenuDrawer = styled(SideMenuElement)`
  cursor: pointer;
  display: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 1.5rem;
  z-index: 5;
  padding: 3rem 1rem;

  .icons {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 2rem;
  }

  .icons > *.active {
    color: var(--shade-4);
  }

  @media (min-width: 768px) {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export default SideMenu;
