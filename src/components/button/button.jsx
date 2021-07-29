import React from "react";
import PropTypes from 'prop-types';

/**
 * Component for button.
 * @component
 * @param {string} children - The text of the button.
 * @param {string} type - The type of the button.
 * @param {boolean} disabled - The disabled attribute of the button.
 * @example
 * const children = 'button'
 * const type = 'submit'
 * const disabled = true
 * return (
 *   <Button type={type} disabled={disabled} >button</Button>
 * )
 * @return {function}
 */
const Button = ({children, type, disabled}) => {
  return <button
    className="button"
    type={type}
    disabled={disabled}
  >
    {children}
  </button>;
};

Button.propTypes = {
  /**
   * Button's text
   */
  children: PropTypes.node.isRequired,
  /**
   * Button's type
   */
  type: PropTypes.string,
  /**
   * Button's disabled attribute
   */
  disabled: PropTypes.bool,
};

export default Button;
