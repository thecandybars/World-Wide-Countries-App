import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import styles from './About.module.css'
import joke from '../video/01.png'
// import joke from '../video/stars.jpeg'


export default function About() {
  return (
    <div className={styles.body}>
      <Nav />
      <div className={styles.about}>
        <div className={styles.title}>Countries project</div>º
        <div className={styles.coded}>Coded by <span>Andrés Vilá</span></div>
        <div className={styles.techno}>using <span>JS, React, Redux, NodeJS, PostgreSQL, Sequelize, Express</span></div>
        <div className={styles.img}><img src={joke} width='700px' /></div>
        <div className={styles.links}>
          <a target="_blank" href="https://github.com/thecandybars">
            <input type="button" value="Github" className={styles.button} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/andrés-vilá-infante-22ba8b53">
            <input type="button" value="Linkedin" className={styles.button} />
          </a>
        </div>
      </div>
    </div >
  )
}
