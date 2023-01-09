import React, { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.legalLinks}>
        <li>
          <a>Privacy Policy</a>
        </li>
        <li>
          <a>Terms and Conditions</a>
        </li>
        <li>
          <a>Cookie Preferences</a>
        </li>
        <li>
          <a>Ad Choices</a>
        </li>
        <li>
          <a>Accessibility </a>
        </li>
      </ul>
      <p className={styles.copyright}>Copyright © FooBar. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
