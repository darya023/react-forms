import React, {useEffect} from "react";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {needShowErrorText, needShowUser, getUser} from "../../store/selectors";
import {AppRoute, ERROR_TEXT, SendingStatus} from "../../const";
import {Link} from "react-router-dom";
import {changeSendingDataStatus} from "../../store/action-creator";

/**
 * Component for main screen.
 * @component
 * @example
 * return (
 *   <MainScreen />
 * )
 * @return {function}
 */
const MainScreen = () => {
  const user = useSelector(getUser);
  const isErrorTextShown = useSelector(needShowErrorText);
  const isUserShown = useSelector(needShowUser);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(changeSendingDataStatus(SendingStatus.INITIAL));
  }, []);

  return <div className="container">
    <Header />
    <main>
      {
        isUserShown
          && <div>
            Пользователь: {user.email}
          </div>
      }
      <div>
        <span>Вы можете </span>
        <Link to={AppRoute.LOGIN} className="link"> Войти </ Link>
        <span> или </span>
        <Link to={AppRoute.SIGNUP} className="link"> Зарегистрироваться</ Link>
      </div>
      {
        isErrorTextShown && ERROR_TEXT
      }
    </main>
  </div>;
};

export default MainScreen;
