import React from 'react'
import { NavLink } from "react-router-dom";
import styles from './Nav.module.css';


export default function Nav() {
    return (
        <nav className={styles.container}>
            <NavLink to="/home">
                <div className={styles.logo}>World Wide Countries</div>
            </NavLink>
            <div className={styles.links}>
                <NavLink to="/" >
                    <input type="button" value="Landing" className={styles.button} />
                </NavLink>

                <NavLink to="/home" className={({ isActive }) => isActive ? styles.activo : ''}>
                    <input type="button" value="Browse" className={styles.button} />
                </NavLink>

                <NavLink to="/activities" className={({ isActive }) => isActive ? styles.activo : ''}>
                    <input type="button" value="Activities" className={styles.button} />
                </NavLink>

                <NavLink to="/about"  className={({ isActive }) => isActive ? styles.activo : ''}>
                    <input type="button" value="About" className={styles.button} />
                </NavLink>
            </div>
        </nav>
    )
}
