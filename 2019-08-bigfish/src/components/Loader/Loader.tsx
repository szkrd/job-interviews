import * as React from 'react'
import styles from './Loader.module.scss'
import range from '../../utils/array/range'

// pure css loader from https://loading.io/css/
export default function Loader() {
  return (
    <div className={styles.loader}>
      {range(8).map((key) => (
        <div key={key} />
      ))}
    </div>
  )
}
