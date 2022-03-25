import React from 'react'
import notFound from '../video/notFound.jpeg'
import styles from './Error404.module.css'

export default function Error404() {
  return (
    <div id={styles.error}>
      <div id={styles.textUp}>We're sorry...</div>
      <img src={notFound} alt='404 error'  id={styles.img}/>
      <div id={styles.textDown}>page <span>not</span> found</div>
    </div>
  )
}
