import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

/**
 * Component for header of app.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 * @return {function}
 */
const Header = () => {
  return <header className="header">
    <Link className="link" to={AppRoute.MAIN}>На главную</Link>
  </header>;
};

export default Header;
