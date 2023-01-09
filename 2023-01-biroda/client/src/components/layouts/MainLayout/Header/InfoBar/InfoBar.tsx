import React, { FC } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'react-feather';
import styles from './InfoBar.module.scss';

const InfoBar: FC = () => {
  return (
    <aside className={styles.infoBar}>
      <div className={styles.trending}>
        <h2>
          Trending on <em>Movies</em>
        </h2>
        <ul>
          <li>
            <a>Disney buys Netflix</a>
          </li>
          <li>
            <a>Terminator 13</a>
          </li>
          <li>
            <a>PacMan the Movie</a>
          </li>
          <li>
            <a>Beta App with Dark Mode</a>
          </li>
        </ul>
      </div>
      <ul className={styles.social}>
        <li>
          <a title="Facebook">
            <Facebook />
          </a>
        </li>
        <li>
          <a title="Twitter">
            <Twitter />
          </a>
        </li>
        <li>
          <a title="Instagram">
            <Instagram />
          </a>
        </li>
        <li>
          <a title="YouTube">
            <Youtube />
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default InfoBar;
