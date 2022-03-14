import React from 'react'
import { Link } from "react-router-dom";
import styles from './Nav.module.css';


export default function Nav() {
    return (
        <nav className={styles.container}>
            
            <div className={styles.links}>
                <Link to="/">
                    <input type="button" value="Landing" className={styles.button} />
                </Link>

                <Link to="/home">
                    <input type="button" value="Browse" className={styles.button} />
                </Link>

                <Link to="/activities">
                    <input type="button" value="Activities" className={styles.button} />
                </Link>

                <Link to="/about">
                    <input type="button" value="About" className={styles.button} />
                </Link>
            </div>
        </nav>
    )
}
