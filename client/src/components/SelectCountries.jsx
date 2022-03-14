import React, { useRef } from 'react'
import { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivitiesList, getCountries } from '../actions'
import styles from './SelectCountries.module.css';
import searchIco from '../icons/manage_search_white_24dp.svg'

export default function SelectCountries({ countriesActivity }) {

    const countries = useSelector(state => state.countries, () => { });

    const [selectedCountries, setSelectedCountries] = useState([]);
    // Para que no aparezcan regiones vacias en el listado cuando filtro paises
    // regionList debe ser una array de objetos { region='', hasCountrySelected=false }
    // y setear cada vez que selectedCountries cambie.
    // Usar esa propiedad para decidir si se muestra o no el titulo de la region
    const [regionList, setRegionList] = useState([]);

    /* INITIALIZATION */
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivitiesList());
    }, [])
    /* INIT AFTER LOADING : FILL SELECTED COUNTRIES */
    useEffect(() => {
        //// FILL REGION LIST
        setRegionList(countries
            .map((obj) => obj.region) // convierte el obj en arr
            .filter((item, index, arr) => arr.indexOf(item) === index)); // filtra repeticiones);
        //// FILL SELECTED COUNTRIES
        const arr = countries.map((c) => (
            {
                id: c.id,
                name: c.name,
                region: c.region,
                flag_icon: c.flag_icon,
                selected: false
            }
        ))
        arr.sort(function (a, b) {
            const A = a.name.toUpperCase();
            const B = b.name.toUpperCase();
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
        });
        setSelectedCountries(arr);
    }, [countries]);

    // SELECTED COUNTRIES
    function liClickHandler(e) {
        // Puede hacerse mas elegante con map? Sin sacar una copia de selectedCountries?
        const selectedCountriesCopy = [...selectedCountries];
        selectedCountriesCopy.forEach(c => c.id === e.target.id && (c.selected = !c.selected))
        setSelectedCountries(selectedCountriesCopy);
        countriesActivity(selectedCountriesCopy);
    }

    // SEARCH
    const inputSearch = useRef();
    const [searchText, setSearchText] = useState();
    const [showSelected, setShowSelected] = useState(false);

    function handleResetButton(e) {
        e.preventDefault();
        setSearchText('');
        inputSearch.current.value = '';
    }
    function handleSearchText(e) {
        setSearchText(e.target.value);
    }
    function showSelectedHandler(e) {
        setShowSelected(e.target.checked);
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <img src={searchIco} />
                <label>Search </label>
                <input type="text" id="searchText" name="searchText" onChange={handleSearchText} ref={inputSearch} />
                <input className={styles.button} type="button" onClick={handleResetButton} value="X" />
                <br />
                <input type='checkbox' onChange={showSelectedHandler} />
                <label>Show selected</label>
            </div>
            {/* COUNTRY LIST */}
            <ul className={styles.countriesList}>
                {
                    selectedCountries &&
                    regionList.map(region =>
                        <div id={styles.region}>
                            <h2>{region}</h2>
                            <div key={region} id={styles.countries}>
                                {selectedCountries.map(c =>
                                    (c.region === region
                                        && (searchText
                                            ? c.name.toUpperCase().includes(searchText.toUpperCase())
                                            : true)
                                        && (showSelected ? c.selected : true)
                                    ) &&
                                    (<li key={c.id} id={c.id} onClick={liClickHandler}
                                        className={c.selected ? styles.countrySelected : styles.countryUnselected}
                                    >
                                        {c.name}
                                        <span style={{ fontSize: '1.5em' }}>
                                            {c.flag_icon !== 'N/A' && ' ' + c.flag_icon}
                                        </span>
                                    </li>)
                                )}
                            </div>
                        </div>
                    )
                }
            </ul>
        </div>
    )
}
