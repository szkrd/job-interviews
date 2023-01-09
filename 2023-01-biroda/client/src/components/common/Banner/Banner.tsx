import React, { FC } from 'react';
import styles from './Banner.module.scss';

const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <img src="/ads/ad-04.gif" />
      <div className={styles.cover} />
    </div>
  );
};

export default Banner;
