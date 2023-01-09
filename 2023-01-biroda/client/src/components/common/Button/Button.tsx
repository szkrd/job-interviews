import React, { FC, HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

// HTMLButtonProps in itself will not work, even if this issue is marked as fixed
// the problem with the HTMLProps generic still exists;
// see: https://github.com/typescript-cheatsheets/react/issues/128#issuecomment-508187015
type ButtonProps = {
  theme?: 'light' | 'dark' | 'default';
  type?: 'button' | 'submit' | 'reset';
} & HTMLProps<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, styles[props.theme ?? 'default'], props.className)}
    >
      {props.children}
    </button>
  );
};

export default Button;
