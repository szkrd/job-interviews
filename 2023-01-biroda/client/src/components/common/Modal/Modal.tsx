import React, { FC, useEffect } from 'react';
import { X } from 'react-feather';
import styles from './Modal.module.scss';

interface IModal {
  title: string;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ title, onClose }) => {
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
            <button>
              <X />
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <p>
            Nulla porttitor accumsan tincidunt. Praesent sapien massa, convallis a pellentesque nec,
            egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            in ipsum id orci porta dapibus.
          </p>
          <p>
            Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla porttitor accumsan
            tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
            Pellentesque in ipsum id orci porta dapibus.
          </p>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
            auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan
            id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh
            pulvinar a.
          </p>
        </div>
        <footer className={styles.footer}>
          <button>footer</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
