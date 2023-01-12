import React, { FC } from 'react';
import styles from './PageTitle.module.scss';

interface IPageTitle {
  text: string;
}

const PageTitle: FC<IPageTitle> = ({ text }) => {
  return <h2 className={styles.pageTitle}>{text}</h2>;
};

export default PageTitle;
