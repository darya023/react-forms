import React from "react";
import Header from "../header/header";

/**
 * Component for not found screen.
 * @component
 * @example
 * return (
 *   <NotFoundScreen />
 * )
 * @return {function}
 */
const NotFoundScreen = () => {
  return <>
    <div className="container">
      <Header />
      <h2>Страница не найдена</h2>
    </div>
  </>;
};

export default NotFoundScreen;
