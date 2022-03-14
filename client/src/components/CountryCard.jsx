import React from "react";
import { Link } from "react-router-dom";
import styles from './CountryCard.module.css';

export default function CountryCard({ name, region, flag, flag_icon, id }) {
  return (
    <div id={styles.card}>
      <Link to={`/countries/${id}`}>
        <div id={styles.name}>{name}</div>
        <img id={styles.flag} src={flag} alt={flag_icon}  />
      </Link>
      <div id={styles.region}>{region}</div>
    </div>
  );
}
