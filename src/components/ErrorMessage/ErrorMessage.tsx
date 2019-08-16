import * as React from 'react'
import styles from './ErrorMessage.module.scss'

interface IProps {}

export default function ErrorMessage(props: React.PropsWithChildren<IProps>) {
  return <div className={styles.errorMessage}>{props.children}</div>
}
