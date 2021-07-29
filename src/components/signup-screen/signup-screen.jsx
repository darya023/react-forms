import React, {useEffect} from "react";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {needShowErrorText} from "../../store/selectors";
import {ERROR_TEXT, SendingStatus} from "../../const";
import FormSignup from "../form/form-signup";
import {changeSendingDataStatus} from "../../store/action-creator";

/**
 * Component for signup screen.
 * @component
 * @example
 * return (
 *   <SignupScreen />
 * )
 * @return {function}
 */
const SignupScreen = () => {
  const isErrorTextShown = useSelector(needShowErrorText);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(changeSendingDataStatus(SendingStatus.INITIAL));
  }, []);

  return <>
    <div className="container">
      <Header />
      <main>
        <FormSignup />
        {
          isErrorTextShown && ERROR_TEXT
        }
      </main>
    </div>
  </>;
};

export default SignupScreen;
