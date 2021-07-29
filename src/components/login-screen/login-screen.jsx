import React, {useEffect} from "react";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {needShowErrorText} from "../../store/selectors";
import {ERROR_TEXT, SendingStatus} from "../../const";
import Form from "../form/form";
import {changeSendingDataStatus} from "../../store/action-creator";

/**
 * Component for login screen.
 * @component
 * @example
 * return (
 *   <LoginScreen />
 * )
 * @return {function}
 */
const LoginScreen = () => {
  const isErrorTextShown = useSelector(needShowErrorText);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(changeSendingDataStatus(SendingStatus.INITIAL));
    };
  }, []);

  return <>
    <div className="container">
      <Header />
      <main>
        <div className="container__form">
          <Form />
        </div>
        <p>{
          isErrorTextShown && ERROR_TEXT
        }</p>
      </main>
    </div>
  </>;
};

export default LoginScreen;
