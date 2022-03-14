import React from 'react'
import { difficultyLevels, durationLevels } from './ActivitiesLevels'
import style from './ActivityCard.module.css'
import difficultyIco from '../icons/equalizer_white_24dp.svg'
import durationIco from '../icons/timelapse_white_24dp.svg'
import seasonIco from '../icons/date_range_white_24dp.svg'

export default function ActivityCard({ name, difficulty, duration, season }) {
    return (
        <div id={style.activityCard}>
            <div className={style.name}>{name}</div>
            <div className={style.grid}>
                <span><img src={difficultyIco} alt="DifLevel" /></span>
                <span>{difficultyLevels[difficulty - 1]}</span>
                <span><img src={durationIco} alt="Duration" /></span>
                <span>{durationLevels[duration - 1]} </span>
                <span><img src={seasonIco} alt="Season" /></span>
                <span>{season}</span>
            </div>
        </div>
    )
}
