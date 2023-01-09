import React, { FC, HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './SearchInput.module.scss';

interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  theme?: 'default' | 'header';
}

const SearchInput: FC<ISearchInputProps> = (props) => {
  return (
    <input
      type="search"
      {...props}
      className={classNames(styles.searchInput, styles[props.theme ?? 'default'])}
    />
  );
};

export default SearchInput;
