import React, { FC } from 'react';
import styles from './Spinner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.shapes} />
    </div>
  );
};

export default Spinner;
