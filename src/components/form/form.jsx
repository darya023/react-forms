import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {login, signup} from '../../store/api-actions';
import {needDisableElement} from '../../store/selectors';
import Button from '../button/button';

const SHAKE_ANIMATION_TIMEOUT = 600;
const INVALID_INPUT_CLASS = `form__input_invalid`;
const SigninFormErrorText = {
  EMAIL: `Пожалуйста, введите корректный адрес электронной почты`,
  PASSWORD: `Пожалуйста, введите пароль`,
  CONFIRMED_PASSWORD: `Пароли не совпадают`,
};
const FieldName = {
  EMAIL: `email`,
  PASSWORD: `password`,
  CONFIRMED_PASSWORD: `confirmed_password`
};
const emailRegexp = new RegExp(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$`);
const initialFormData = {
  [FieldName.EMAIL]: ``,
  [FieldName.PASSWORD]: ``,
  [FieldName.CONFIRMED_PASSWORD]: ``,
};

/**
 * Adds .shake class to an aim element and removes this class after 600ms.
 * @param {object} ref - A ref to an aim element.
 */
const shake = (ref) => {
  const shakeClass = `shake`;
  ref.current.classList.add(shakeClass);

  setTimeout(() => {
    ref.current.classList.remove(shakeClass);
  }, SHAKE_ANIMATION_TIMEOUT);
};

/**
 * Component for form.
 * @component
 * @param {boolean} isSignup - If the type of form is signup.
 * @example
 * const isSignup = true
 * return (
 *   <Form isSignup={isSignup} />
 * )
 * @return {function}
 */
const Form = ({isSignup}) => {
  const isElementDisabled = useSelector(needDisableElement);
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(false);
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (isSignup) {
      dispatch(signup(data));
      return;
    }
    dispatch(login(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !emailRegexp.test(formData[FieldName.EMAIL])
        || !formData[FieldName.PASSWORD]
        || isSignup && formData[FieldName.PASSWORD] !== formData[FieldName.CONFIRMED_PASSWORD]
    ) {
      shake(formRef);
    }

    if (!emailRegexp.test(formData[FieldName.EMAIL])) {
      setErrorMessage(SigninFormErrorText.EMAIL);
      emailRef.current.classList.add(INVALID_INPUT_CLASS);

      return;
    }

    if (!formData[FieldName.PASSWORD]) {
      setErrorMessage(SigninFormErrorText.PASSWORD);
      passwordRef.current.classList.add(INVALID_INPUT_CLASS);

      return;
    }

    if (isSignup && formData[FieldName.PASSWORD] !== formData[FieldName.CONFIRMED_PASSWORD]) {
      setErrorMessage(SigninFormErrorText.CONFIRMED_PASSWORD);
      passwordRef.current.classList.add(INVALID_INPUT_CLASS);
      confirmedPasswordRef.current.classList.add(INVALID_INPUT_CLASS);

      return;
    }

    onSubmit({
      [FieldName.EMAIL]: formData[FieldName.EMAIL],
      [FieldName.PASSWORD]: formData[FieldName.PASSWORD],
    });
  };

  const handleFieldChange = (event) => {
    const {name, value, classList} = event.target;
    setFormData((state)=>({
      ...state,
      [name]: value
    }));

    if (classList.contains(INVALID_INPUT_CLASS)) {
      classList.remove(INVALID_INPUT_CLASS);
    }
  };

  return (
    <form
      action="#"
      ref={formRef}
      className="form"
      onSubmit={handleSubmit}
    >
      <h3 className="form__title">{
        isSignup
          ? `Регистрация`
          : `Авторизация`
      }</h3>
      <div className="form__fields">
        <div className="form__row">
          <label className="form__label" htmlFor={FieldName.EMAIL}>Почта</label>
          <input
            id={FieldName.EMAIL}
            className="form__input"
            type="text"
            placeholder="example@mail.ru"
            name={FieldName.EMAIL}
            ref={emailRef}
            onFocus={
              () => setErrorMessage(false)
            }
            onChange={handleFieldChange}
            value={formData[FieldName.EMAIL]}
            disabled={isElementDisabled}
          />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor={FieldName.PASSWORD}>Пароль</label>
          <input
            id={FieldName.PASSWORD}
            className="form__input"
            type="password"
            placeholder="Пароль"
            name={FieldName.PASSWORD}
            ref={passwordRef}
            onFocus={
              () => setErrorMessage(false)
            }
            disabled={isElementDisabled}
            onChange={handleFieldChange}
            value={formData[FieldName.PASSWORD]}
          />
        </div>{
          isSignup
            && <div className="form__row">
              <label className="form__label" htmlFor={FieldName.CONFIRMED_PASSWORD}>Повторите пароль</label>
              <input
                id={FieldName.CONFIRMED_PASSWORD}
                className="form__input"
                type="password"
                placeholder="Пароль"
                name={FieldName.CONFIRMED_PASSWORD}
                ref={confirmedPasswordRef}
                onFocus={
                  () => setErrorMessage(false)
                }
                disabled={isElementDisabled}
                onChange={handleFieldChange}
                value={formData[FieldName.CONFIRMED_PASSWORD]}
              />
            </div>
        }</div>
      <div className="form__submit form__row">
        <Button
          type="submit"
          disabled={isElementDisabled}
        >
          {!isElementDisabled && isSignup && `Зарегистрироваться`}
          {!isElementDisabled && !isSignup && `Войти`}
          {isElementDisabled && `Отправка...`}
        </Button>
      </div>
      <div className="form__row">
        <span>{
          isSignup
            ? `Есть аккаунт? `
            : `Еще нет аккаунта? `
        }</span>
        <Link
          to={
            isSignup
              ? AppRoute.LOGIN
              : AppRoute.SIGNUP
          }
          className="link">{
            isSignup
              ? `Войти`
              : `Зарегистрироваться`
          }</ Link>
      </div>
      {errorMessage && <div className="form__message">{errorMessage}</div>}
    </form>
  );
};

Form.propTypes = {
  /**
   * Form's mode
   */
  isSignup: PropTypes.bool,
};

export default Form;
