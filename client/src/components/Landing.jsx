import React from "react";
import { Link } from "react-router-dom";
import videoBack from '../video/videoBack_720.mp4'
import style from './Landing.module.css'

export default function Landing() {

  return (
    <div className={style.content}>

      <Link to="/home">
      <input type="button" value="Entrar" className={style.button} />
      </Link>

      <video autoPlay muted loop id={style.myVideo}>
        <source src={videoBack} type="video/mp4" />
      </video>

    </div>
  );
}
