import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivitiesList, orderCountries, filterCountries } from "../actions";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard.jsx";
import Pages from "./Pages";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [order, setOrder] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState({ region: "", activity: "" });

  const countries = useSelector((state) => state.countries, () => {});
  const activitiesList = useSelector((state) => state.activitiesList);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesXPage, setCountriesXPage] = useState(9);
  const lastCountry = currentPage * countriesXPage;
  const firstCountry = lastCountry - countriesXPage;
  const pageCountries = countries.slice(firstCountry, lastCountry);

  const pages = (page) => {
    setCurrentPage(page);
    if (page === 1) setCountriesXPage(9);
    else setCountriesXPage(10);
  };

  // Inicialización (con [] vacio)
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
    // const x = [];
    // x.push(...countries)
    // setAllCountries(x);
    setAllCountries(...countries);
  }, [])

  // Inicialización forzada con botón
  function handleReloadDB(e) {
    e.preventDefault();
    dispatch(getCountries());
    dispatch(getActivitiesList());
    setAllCountries(...countries);
  }

  // function getRegionsList() {
  //   return countries
  //     .map((obj) => obj.region) // convierte el obj en arr
  //     .filter((item, index, arr) => arr.indexOf(item) === index); // filtra repeticiones
  // }

  // ORDER
  function handleOrder(e) {
    setOrder(e.target.id);
  }
  useEffect(() => {
    dispatch(orderCountries(order, countries)); // order=id del botón: discrimina la acción
    console.log("🚀 ~ file: Home.jsx ~ line 62 ~ useEffect ~ order", order)
  }, [order]);
  
  // FILTER
  // Vuelve y filtra sobre countries ya filtrado. Debe filtrar sobre allCountries
  function handleFilter(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value }); // { region:'Asia', activity:'Cagar' }
  }
  useEffect(() => {
    dispatch(filterCountries(filter, allCountries));
    console.log("🚀 ~ file: Home.jsx ~ line 72 ~ useEffect ~ filter", filter)
  }, [filter]);

  // La barra de botones se podria modularizar
  return (
    <div>
      <Link to="/activity">Crear actividad</Link>
      <h1>Home de Countries</h1>
      <button onClick={(e) => { handleReloadDB(e) }}>reload DB</button>
      <div>
        <div>
          <input type="radio" id="asc" name="order" value="ASC" onChange={handleOrder} />
          <label>Asc</label>
          <input type="radio" id="des" name="order" value="DES" onChange={handleOrder} />
          <label>Des</label>
          <input type="radio" id="popUp" name="order" value="PopUp" onChange={handleOrder} />
          <label>PopUp</label>
          <input type="radio" id="popDown" name="order" value="PopDown" onChange={handleOrder} />
          <label>PopDown</label>
        </div>

        {/* <label>Search:</label>
        <input type="text" id="search" name="search"></input>
        <button onSubmit={handleSearch}>Serch</button> */}

        <select name="region" onChange={handleFilter}>
          <option id="all" value="all"></option>
          <option id="Asia" value="Asia">Asia</option>
          <option id="Oceania" value="Oceania">Oceania</option>
          <option id="Americas" value="Americas">Americas</option>
          <option id="Europe" value="Europe">Europe</option>
          <option id="Africa" value="Africa">Africa</option>
          <option id="Antartic" value="Antartic">Antartic</option>
        </select>

        <select name="activity" id="">
          {
            activitiesList && activitiesList.map((act) => {
              return (<option value={act} key={act}>{act}</option>);
            })}
        </select>

        <Pages
          countriesXPage={countriesXPage}
          totalCountries={countries.length}
          pages={pages}
        />

        <div id="countries">
          {pageCountries ?
            (pageCountries.map((country) => {
              return (
                <CountryCard
                  key={country.id}
                  name={country.name}
                  region={country.region}
                  flag={country.flag}
                  id={country.id}
                />
              );
            }))
            : (<h2>No hay paises para mostrar</h2>)}
        </div>
      </div>
    </div>
  );
}
