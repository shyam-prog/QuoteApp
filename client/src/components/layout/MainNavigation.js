import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { authActions } from "../../reduxStore/indexRedux";

const MainNavigation = () => {
  
  const token = useSelector((state) => state.authSlice.token);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dispatch = useDispatch();
  const decoded = (token && jwt_decode(token));

  console.log(decoded);

  const [showRightMenu, setShowRightMenu] = useState(false);

  const onToggleHandler = () => {
    console.log('onClick');
    setShowRightMenu(!showRightMenu);
    
  }

  useEffect(() => {
    if (!token) {
      setIsSignedIn(false)
    }

    if (token) {
      setIsSignedIn(true);
    }
  }, [token]);

  return (
    <>
    <header className={classes.header}>
      <div className={classes.logo}>Fabulous Quotes!</div>
      <div className={classes.quotesLogo}>FAB Quotes!</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" className={(navData) => navData.isActive ? classes.active : ''}>
              Quotes
            </NavLink>
          </li>
          {
            isSignedIn ? (
              <React.Fragment>

                <li>
                  <NavLink to="/newquote" className={(navData) => navData.isActive ? classes.active : ''}>
                    Add Quote
                  </NavLink>
                </li>
                <li >
                  <NavLink to="/auth" className={(navData) => navData.isActive ? classes.active : ''}>
                    Logout
                  </NavLink>
                </li>

              </React.Fragment>
            ) : (
              <>

                <li>
                  <NavLink to="/auth" className={(navData) => navData.isActive ? classes.active : ''}>
                    Login
                  </NavLink>
                </li>
              </>
            )
          }
        </ul>
          
      </nav>
      {token && <div className={classes.user}>{decoded.name || "UserName"}</div>}
      <div className={`${classes.mainheader__toggle} ${showRightMenu ? classes.true : ''}`} onClick={onToggleHandler}>   
        <div className={`${classes.bar1}`}></div>
        <div className={`${classes.bar2}`}></div>
        <div className={`${classes.bar3}`}></div>
      </div>
      
    </header>
    <div className={`${showRightMenu ? classes.activeMenu : ''} ${classes.rightmenu}`}>
      <ul >
      { token && (
        <li className={classes.rightMenuUser}>
        Username: {decoded.name}
      </li>
      )}
          <li onClick={onToggleHandler}>
            <NavLink to="/quotes" className={(navData) => navData.isActive ? classes.active : ''}>
              Quotes
            </NavLink>
          </li>
          {
            isSignedIn ? (
              <React.Fragment>

                <li onClick={onToggleHandler}>
                  <NavLink to="/newquote" className={(navData) => navData.isActive ? classes.active : ''}>
                    Add Quote
                  </NavLink>
                </li>
                <li onClick={onToggleHandler}>
                  <NavLink to="/auth" className={(navData) => navData.isActive ? classes.active : ''}>
                    Logout
                  </NavLink>
                </li>

              </React.Fragment>
            ) : (
              <>

                <li onClick={onToggleHandler}>
                  <NavLink to="/auth" className={(navData) => navData.isActive ? classes.active : ''}>
                    Login
                  </NavLink>
                </li>
              </>
            )
          }
          
        </ul>
    </div>
    </>
  );
};

export default MainNavigation;
