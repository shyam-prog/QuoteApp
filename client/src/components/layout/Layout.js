import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Footer from "../UI/Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <Footer />

    </Fragment>
  );
};

export default Layout;
