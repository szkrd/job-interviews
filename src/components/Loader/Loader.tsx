import * as React from 'react'
import styles from './Loader.module.scss'

// pure css loader from https://loading.io/css/
export default function Loader() {
  return (
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
