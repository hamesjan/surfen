import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Background from "./Background/Background";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <Background />
      <MainNavigation title={props.title} username={"John"} />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
