import React, { FC, ReactNode, useEffect } from 'react';
import { X } from 'react-feather';
import styles from './Modal.module.scss';

interface IModal {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: FC<IModal> = ({ title, onClose, children, footer }) => {
  useEffect(() => {
    document.body.classList.add(styles.bodyModal);
    return () => {
      document.body.classList.remove(styles.bodyModal);
    };
  }, []);
  return (
    <div className={styles.modal}>
      <div className={styles.modalWindow}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <div className={styles.closeWrapper}>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
