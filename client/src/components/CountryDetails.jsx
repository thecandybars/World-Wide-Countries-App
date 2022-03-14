import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../actions";
import ActivityCard from "./ActivityCard";
import style from './CountryDetails.module.css';
import Nav from "./Nav";

export default function CountryDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const countryDetails = useSelector((state) => state.countryDetails);

    // Inicialización
    useEffect(() => {
        dispatch(getCountryDetails(id));
    }, [])

    return (
        <div>
            <Nav />
            {
                countryDetails.length !== 0 ?
                    (<div id={style.detail}>
                        <div id={style.name}>{countryDetails.name}</div>
                        <div id={style.id}>({countryDetails.id})</div>
                        <img id={style.flag} src={countryDetails.flag} alt="flag not found" width="150px" />
                        <div className={style.continent}>
                            <div className={style.region}>{countryDetails.region}</div>
                            {countryDetails.subregion &&
                                <div className={style.subregion}>{countryDetails.subregion}</div>}
                        </div>


                        <div className={style.dataGrid}>
                            <div id={style.data}>
                                <span className={style.dataLabel}>Capital</span>
                                <span className={style.dataValue}>{countryDetails.capital}</span>
                            </div>
                            <div id={style.data}>
                                <span className={style.dataLabel}>Area</span>
                                <span className={style.dataValue}>{
                                    countryDetails.area > 1000000
                                        ? (Math.round((countryDetails.area / 1000000) * 100) / 100 + ' M Km2') // ROUND((area/millon)*digitos dec)/digitos dec = M Km2
                                        : Number(countryDetails.area).toLocaleString() + ' Km2'}</span>
                            </div>

                            <div id={style.data}>
                                <span className={style.dataLabel}>Population</span>
                                <span className={style.dataValue}>{Number(countryDetails.population).toLocaleString()}</span>
                            </div>
                        </div>


                        <div className={style.activities}>
                            {
                                countryDetails.activities &&
                                countryDetails.activities.map(act => (
                                    <ActivityCard
                                        name={act.name}
                                        difficulty={act.difficulty}
                                        duration={act.duration}
                                        season={act.season}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    ) : <div className={style.loader}></div>
            }
        </div>
    )
}