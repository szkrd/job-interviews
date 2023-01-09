import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import scssVars from '../../../../styles/scssVars';
import Banner from '../../../common/Banner/Banner';
import Button from '../../../common/Button/Button';
import Logo from '../../../common/Logo/Logo';
import SearchInput from '../../../common/SearchInput/SearchInput';
import styles from './Header.module.scss';
import InfoBar from './InfoBar/InfoBar';

const Header: FC = () => {
  return (
    <div className={styles.siteHeader}>
      <header className={styles.headerBar}>
        <div className={styles.logo}>
          <Link to="/" tabIndex={-1}>
            <Logo fill={scssVars.colors.white} />
            <i className={styles.copyright}>&copy;</i>
          </Link>
        </div>
        <div className={styles.ads}>
          <Banner />
        </div>
        <div className={styles.search}>
          <SearchInput theme="header" />
          <Button theme="light">Search</Button>
        </div>
      </header>
      <InfoBar />
    </div>
  );
};

export default Header;
