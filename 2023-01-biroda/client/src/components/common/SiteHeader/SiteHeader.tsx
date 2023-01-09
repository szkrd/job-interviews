import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import scssVars from '../../../styles/scssVars';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import styles from './SiteHeader.module.scss';

const SiteHeader: FC = () => {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.logo}>
        <Link to="/">
          <Logo fill={scssVars.colors.white} />
        </Link>
      </div>
      <div className={styles.search}>
        <SearchInput theme="header" />
        <Button>Search</Button>
      </div>
    </header>
  );
};

export default SiteHeader;
