import React from 'react'
import styles from './About.module.css'
import joke from '../video/about.png'

export default function About() {
  return (
    <div className={styles.body}>
      <div className={styles.about}>
        <div className={styles.title}>World Wide Countries</div>
        <div className={styles.subtitle}>
          <a target="_blank" href="https://www.soyhenry.com" rel="noreferrer">
            Henry
          </a>
          's bootcamp individual project
        </div>
        <div className={styles.coded}>Coded by <span>Andrés Vilá</span></div>
        <div className={styles.techno}>using <span>JS, React, Redux, NodeJS, PostgreSQL, Sequelize, Express</span></div>
        <div className={styles.img}><img src={joke} width='650px' alt='joke' /></div>
        <div className={styles.cartoons}>
          Cartoons by:
          <a target="_blank" href="https://app.hedgeye.com/insights/51748-this-week-in-hedgeye-cartoons?type=cartoons" rel="noreferrer">
            Hedgeye cartoons
          </a>

        </div>
        <div className={styles.links}>
          <a target="_blank" href="https://github.com/thecandybars" rel="noreferrer">
            <input type="button" value="Github" className={styles.button} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/andrés-vilá-infante-22ba8b53" rel="noreferrer">
            <input type="button" value="Linkedin" className={styles.button} />
          </a>
        </div>
      </div>
    </div >
  )
}
