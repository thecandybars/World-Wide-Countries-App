import React from "react";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivitiesList, countriesTools } from "../actions";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import CountryCard from "./CountryCard.jsx";
import Paging from "./Paging";
import style from "./Home.module.css";
import "./Global.css";

import reloadIco from '../icons/refresh_white_24dp.svg'
import sortAzIco from '../icons/sort_by_alpha_white_24dp.svg'
import sortZaIco from '../icons/sort_by_omega_white_24dp.svg'
import sortPersonUpIco from '../icons/person_add_white_24dp.svg'
import sortPersonDwIco from '../icons/person_remove_white_24dp.svg'


export default function Home() {
  // ACTIONS
  const dispatch = useDispatch();
  // LOCAL STATES
  const [filter, setFilter] = useState({ region: "", activity: "" });
  const [order, setOrder] = useState('');
  const [searchText, setSearchText] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [regionList, setRegionList] = useState([]);
  // GLOBAL STATE
  const countries = useSelector((state) => state.countries, () => { });
  const activitiesList = useSelector((state) => state.activitiesList);

  // Seria interesante hacer orderList dinámica
  // const orderList = ['none', 'asc', 'des', 'popUp', 'popDown'];
  // https://www.geeksforgeeks.org/how-to-set-default-value-in-select-using-reactjs/

  /////// INITIALIZATION
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
  }, [])
  // Cuando countries esta cargado:
  useEffect(() => {
    if (allCountries.length === 0) {
      console.log("holaaaaa");
      setAllCountries([...countries]);
      setRegionList(countries
        .map((obj) => obj.region) // convierte el obj en arr
        .filter((item, index, arr) => arr.indexOf(item) === index)); // filtra repeticiones);
      pages(1); // Go to page 1
    }
  }, [countries])
  // Re-inicialización forzada con botón
  function handleReloadDB(e) {
    e.preventDefault();
    setAllCountries([]);
    dispatch(getCountries());
    dispatch(getActivitiesList());
  }

  ///// PAGING
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesXPage, setCountriesXPage] = useState(19);
  const [totalPages, setTotalPages] = useState(0);
  const lastCountry = currentPage * countriesXPage;
  const firstCountry = lastCountry - countriesXPage;
  const pageCountries = countries.slice(firstCountry, lastCountry);

  const pages = (page) => {
    //////// Solo usar para ese requisito extraño del PI !!!
    // if (page === 1) setCountriesXPage(9);  
    // else setCountriesXPage(10);
    setCurrentPage(page);
  };
  useEffect(() => {
    if (countries) {
      console.log("🚀 ~ file: Home.jsx ~ line 77 ~ useEffect ~ countries", countries)
      const calcTotalPages = Math.ceil(countries.length / countriesXPage)
      setTotalPages(calcTotalPages);
      if (currentPage > calcTotalPages) setCurrentPage(1);
    }
  }, [countries, countriesXPage]);

  /////////////// COUNTRIES TOOLS : FILTER, SEARCH && ORDER : se podria modularizar !!!!!!
  useEffect(() => {
    dispatch(countriesTools(filter, searchText, order, allCountries));
    pages(currentPage);
  }, [order, filter, searchText]);

  // FILTER
  const regionFilter = useRef();
  const activityFilter = useRef();

  function handleFilter(e) {
    // Es un obj tipo { region:'Asia', activity:'Morder' }
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }
  function handleClearFilters() {
    setFilter({});
    regionFilter.current.value = '';
    activityFilter.current.value = '';
  }
  // SEARCH
  const inputSearch = useRef();

  function handleResetButton(e) {
    e.preventDefault();
    setSearchText('');
    inputSearch.current.value = '';
  }
  function handleSearchText(e) {
    setSearchText(e.target.value);
  }
  // ORDER
  function handleOrder(e) {
    setOrder(e.target.id);
  }

  return (
    <div id={style.container}>

      {/* Como pongo Nav en todas las paginas?? */}
      <Nav />

      <div className={style.countryTools}>
        {/* SETTINGS  */}
        <div className={style.settings}>
          <div id={style.reload}>
            <label>Reload</label>
            <img src={reloadIco} value="Reload" onClick={handleReloadDB} /> <br />
          </div>
          <div id={style.results}>
            <label>Page results <span>{countriesXPage}</span></label>
            <input type="range" min='8' max='32' size='2' value={countriesXPage} onChange={(e) => setCountriesXPage(e.target.value)} />
            <label>Total results <span>{countries.length}</span></label>
          </div>
        </div>

        {/* PAGING  */}
        <Paging
          totalPages={totalPages}
          currentPage={currentPage}
          pages={pages}
        />

        {/* TOOLS */}
        <div className={style.tools}>

          {/* SELECT ORDER */}
          <div id={style.sort} className={style.tool}>
            <label>Sort</label>
            <div>
              <img src={sortAzIco} id="asc" name="order" value="ASC" onClick={handleOrder}
                className={order === 'asc' ? style.imgSelected : null}
              />
              <img src={sortZaIco} id="des" name="order" value="DES" onClick={handleOrder}
                className={order === 'des' ? style.imgSelected : null}
              />
              <img src={sortPersonUpIco} id="popUp" name="order" value="PopUp" onClick={handleOrder}
                className={order === 'popUp' ? style.imgSelected : null}
              />
              <img src={sortPersonDwIco} id="popDown" name="order" value="PopDown" onClick={handleOrder}
                className={order === 'popDown' ? style.imgSelected : null}
              />
            </div>

          </div>

          {/* SEARCH TEXT */}
          <div id={style.search} className={style.tool}>
            <label>Search</label>
            <div>
              <input type="text" size='15' id="searchText" name="searchText" onChange={handleSearchText} ref={inputSearch} />
              <input type="button" onClick={handleResetButton} value="X" className={style.button}
                style={searchText ? { visibility: 'visible' } : { visibility: 'hidden' }}
              />
            </div>
          </div>

          {/* SELECT FILTER */}
          <div className={style.tool}>
            <label>Filter</label>
            <div id={style.filter}>
              {/* Region */}
              {/* MIRA https://www.geeksforgeeks.org/how-to-set-default-value-in-select-using-reactjs/ */}
              <select name="region" onChange={handleFilter} ref={regionFilter} defaultValue='By region'>
                <option disabled>By region</option>
                <option value="">All regions</option>
                {
                  regionList && regionList.map((reg) => {
                    return (<option value={reg} key={reg} >{reg}</option>);
                  })}
              </select>
              {/* Activity  */}
              <select name="activity" onChange={handleFilter} ref={activityFilter} defaultValue='By activity'>
                <option disabled>By activity</option>
                <option value="" >All activities</option>
                {
                  activitiesList && activitiesList.map((act) => {
                    return (<option value={act} key={act} >{act}</option>);
                  })}
              </select>
              <input type="button" onClick={handleClearFilters} value="X" className={style.button}
                style={(filter.region || filter.activity) ? { visibility: 'visible' } : { visibility: 'hidden' }}

              />
            </div>



          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------- */}

      {/* COUNTRY CARDS  */}
      <div id={style.countries}>
        {countries.length ?
          (pageCountries.map((country) => {
            return (
              <CountryCard
                key={country.id}
                name={country.name}
                region={country.region}
                flag={country.flag}
                flag_icon={country.flag_icon}
                id={country.id}
              />
            );
          }))
          : (<div className={style.loader}></div>)}
      </div>

    </div>
  );
}
