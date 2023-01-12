import React, { FC, ReactNode } from 'react';
import PageTitle from '../PageTitle/PageTitle';
import styles from './Page.module.scss';

interface IPage {
  title?: string;
  children: ReactNode;
}

const Page: FC<IPage> = ({ title, children }) => {
  return (
    <div className={styles.page}>
      {typeof title === 'string' && <PageTitle text={title} />}
      {children}
    </div>
  );
};

export default Page;
