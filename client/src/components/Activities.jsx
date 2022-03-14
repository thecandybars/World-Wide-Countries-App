import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { difficultyLevels, durationLevels } from './ActivitiesLevels'
import SelectCountries from './SelectCountries';
import nameIco from '../icons/text_fields_white_24dp.svg'
import difficultyIco from '../icons/equalizer_white_24dp.svg'
import durationIco from '../icons/timelapse_white_24dp.svg'
import seasonIco from '../icons/date_range_white_24dp.svg'
import countryIco from '../icons/flag_white_24dp.svg'
import styles from './Activities.module.css';
import Nav from './Nav';

export default function Activities() {
    const responseText = useRef();

    // FORM VALIDATION
    function validate(input) {
        let errors = {};

        if (!input.name) {
            errors.name = 'All fields are required';
        } else if (!(/^[a-zA-Z0-9!Ññ@#$%&*()_ ;:-]*$/.test(input.name))) {
            errors.name = 'No special characters allowed'
        } else if (!(/^[a-zA-ZÑñ].*/.test(input.name))) {
            errors.name = 'Names cant begin with a number'
        }

        if (!input.season) { errors.season = 'All fields are required'; }

        return errors;
    };

    // FORM DATA
    const [errors, setErrors] = useState({
        // edited : se usa solo para comprobar si la forma ya fue editada y enable el Submit.
        //          Debe haber una manera mas elegante de hacerlo. Ver setErrors({...errors, edited:''});
        edited: 'no',
    });
    const [input, setInput] = useState({
        name: '',
        difficulty: '3',
        duration: '3',
        season: '',
        countries: [],
    });
    function handleInputChange(e) {
        setErrors({ ...errors, edited: '' });
        const currentInputs = { ...input, [e.target.name]: e.target.value };
        setInput(currentInputs);
        setErrors(validate(currentInputs));
    }

    // DATA SUBMIT
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/activities', input);
        responseText.current.innerHTML = (response.status === 200)
            ? " Activity *" + input.name + "* has been added"
            : response.status + " " + response.statusText;
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    // SELECT COUNTRIES ACTIVITY
    const [countriesPerActivity, setCountriesPerActivity] = useState([]);
    const countriesActivity = (countries) => {
        setCountriesPerActivity(countries.filter(c => c.selected === true));
    };
    useEffect(() => {
        setInput({ ...input, countries: countriesPerActivity.map(c => c.id) })
    }, [countriesPerActivity])

    return (
        <div>
            <Nav />
            <form onSubmit={handleSubmit} id={styles.gridContainer}>

                <span className={styles.name}>
                    <img src={nameIco} alt="ActName" />
                    <label>Name</label>
                </span>
                <input type="text" name="name" value={input.name}
                    onChange={handleInputChange} />
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
                        id={!Object.keys(errors).length && styles.buttonHover}  // Remove hover if disabled 
                        disabled={Object.keys(errors).length}
                    />
                </div>
            </form>
            <div ref={responseText} className={styles.afterSubmit}></div>

            <div> {<SelectCountries countriesActivity={countriesActivity} />} </div>
        </div>
    )
}