import { Search as SearchIcon } from 'react-feather';
import classNames from 'classnames';
import React, { FC, HTMLProps } from 'react';
import styles from './SearchInput.module.scss';
import scssVars from '../../../styles/scssVars';

interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  theme?: 'default' | 'header';
}

const SearchInput: FC<ISearchInputProps> = (props) => {
  return (
    <div className={classNames(styles.searchInput, props.className)}>
      <SearchIcon stroke={scssVars.colors.aluminiumHighlight} />
      <input
        type="search"
        {...props}
        className={classNames(styles[props.theme ?? 'default'], props.inputClassName)}
      />
    </div>
  );
};

export default SearchInput;
