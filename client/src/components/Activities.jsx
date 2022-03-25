import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { difficultyLevels, durationLevels } from './ActivitiesLevels'
import { getActivitiesList } from "../actions";
import SelectCountries from './SelectCountries';
import nameIco from '../icons/text_fields_white_24dp.svg'
import difficultyIco from '../icons/equalizer_white_24dp.svg'
import durationIco from '../icons/timelapse_white_24dp.svg'
import seasonIco from '../icons/date_range_white_24dp.svg'
import countryIco from '../icons/flag_white_24dp.svg'
import styles from './Activities.module.css';

export default function Activities() {
    const responseText = useRef();

    /////// INITIALIZATION
    const activitiesList = useSelector((state) => state.activitiesList, () => { });

    // FORM VALIDATION
    function validate(input) {
        let errors = {};

        if (!input.name) {
            errors.name = 'All fields are required';
        } else if (!(/^[a-zA-Z0-9!Ññ@#$%&*()_ ;:-]*$/.test(input.name))) {
            errors.name = 'No special characters allowed'
        } else if (!(/^[a-zA-ZÑñ].*/.test(input.name))) {
            errors.name = 'Names cant begin with a number'
        } else if (activitiesList.find(act => act.toUpperCase() === input.name.toUpperCase())) {
            errors.name = `Activity ${input.name} already exists`
        }

        if (!input.season) { errors.season = 'All fields are required'; }

        return errors;
    };

    // FORM DATA
    const [errors, setErrors] = useState({
        edited: 'no yet',   // errors arranca con datos para forzar el disable del boton Submit.
    });
    const [input, setInput] = useState({
        name: '',
        difficulty: '3',
        duration: '3',
        season: '',
        countries: [],
    });
    function handleInputChange(e) {
        setErrors({ ...errors });
        const currentInputs = { ...input, [e.target.name]: e.target.value };
        // FORM FORMAT
        currentInputs.name = currentInputs.name ? currentInputs.name[0].toUpperCase() + currentInputs.name.slice(1) : '';

        setInput(currentInputs);
        setErrors(validate(currentInputs));
    }
    console.log("🚀 ~ file: Activities.jsx ~ line 64 ~ handleSubmit ~ Object.keys(input)", Object.values(input))
    console.log("🚀 ~ file: Activities.jsx ~ line 65 ~ handleSubmit ~ Object.keys(input).length", Object.values(input).length)

    // DATA SUBMIT
    async function handleSubmit(e) {
        e.preventDefault();
        if (!Object.values(input).filter((el) => (el === '' || el.length===0)).length) {
            const response = await axios.post('http://localhost:3001/activities', input);
            const totCountries = input.countries.length;
            const respCountries = totCountries
                ? totCountries > 1
                    ? ' to <span>' + totCountries + ' countries</span>'
                    : ' to <span>1 country</span>'
                : '';
            responseText.current.innerHTML = (response.status === 200)
                ? "** Activity <span>" + input.name + "</span> has been added" + respCountries + " **"
                : response.status + " " + response.statusText;
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    // SELECT COUNTRIES ACTIVITY
    const [countriesPerActivity, setCountriesPerActivity] = useState([]);
    const countriesActivity = (countries) => {
        setCountriesPerActivity(countries.filter(c => c.selected === true));
    };
    useEffect(() => {
        // setInput({ ...input, countries: countriesPerActivity.map(c => c.id) })
        setInput(input => ({ ...input, countries: countriesPerActivity.map(c => c.id) }))
    }, [countriesPerActivity])

    return (
        <div>
            <form onSubmit={handleSubmit} id={styles.gridContainer}>

                <span className={styles.name}>
                    <img src={nameIco} alt="ActName" />
                    <label>Name</label>
                </span>
                <input type="text" name="name" value={input.name}
                    onChange={handleInputChange} placeholder='Give a name to this activity...' />
                <span className={styles.danger}>{errors.name}</span>

                <span className={styles.name}>
                    <img src={difficultyIco} alt="DifLevel" />
                    <label className={styles}>Difficulty</label>
                </span>
                <input type="range" name="difficulty" min="1" max="5" value={input.difficulty}
                    className={errors.difficulty && 'danger'}
                    onChange={handleInputChange} />
                <span className={styles.sliderVal}>{difficultyLevels[input.difficulty - 1]}</span>

                <span className={styles.name}>
                    <img src={durationIco} alt="Duration" />
                    <label>Duration</label>
                </span>
                <input type="range" name="duration" min='1' max='8' value={input.duration}
                    className={errors.duration && 'danger'}
                    onChange={handleInputChange} />
                <span className={styles.sliderVal}>{durationLevels[input.duration - 1]}</span>

                <span className={styles.name}>
                    <img src={seasonIco} alt="Season" />
                    <label>Season</label>
                </span>
                <select name="season" onChange={handleInputChange} defaultValue='Choose a season'>
                    <option disabled >Choose a season</option>
                    <option value='Spring'>Spring</option>
                    <option value='Summer'>Summer</option>
                    <option value='Autumn'>Autumn</option>
                    <option value='Winter'>Winter</option>
                </select>
                <span className={styles.danger}>{errors.season}</span>

                <span className={styles.name}>
                    <img src={countryIco} alt="Country" />
                    <label>Countries</label>
                </span>
                <span id={styles.selectCountries}>
                    {
                        countriesPerActivity.length !== 0 &&
                        countriesPerActivity.map(c => (
                            <div key={c.id} className={styles.country}>
                                <div style={{ fontSize: 2.1 + 'em' }}>{c.flag_icon}</div>
                                <div style={{ fontSize: 0.7 + 'em' }}>{c.name.length > 12 ? c.name.slice(0, 12) + '...' : c.name}</div>
                            </div>
                        ))
                    }
                </span>
                <span></span>

                <span></span>
                <div>
                    <input type="submit" value="Add activity"
                        className={styles.button}
                        id={!Object.keys(errors).length ? styles.buttonHover : ''}  // Remove hover if disabled 
                        disabled={Object.keys(errors).length}
                    />
                </div>
            </form>
            <div ref={responseText} className={styles.afterSubmit}></div>

            <div> {<SelectCountries countriesActivity={countriesActivity} />} </div>
        </div>
    )
}