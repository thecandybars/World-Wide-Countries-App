import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        const countries = await axios.get('/countries'); // http://localhost:3001
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data,
        })
    }
}
export function getCountryDetails(id) {
    return async function (dispatch) {
        const country = await axios.get('/countries/' + id);
        return dispatch({
            type: 'GET_COUNTRY_DETAIL',
            payload: country.data,
        })
    }
}
export function getActivitiesList() {
    return async function (dispatch) {
        const activitiesList = await axios.get('/activities');
        return dispatch({
            type: 'GET_ACTIVITIES_LIST',
            payload: activitiesList.data,
        })
    }
}
export function getRegionsList(countries) {
    const regions = countries
        .map((obj) => obj.region) // convierte el obj en arr
        .filter((item, index, arr) => arr.indexOf(item) === index); // filtra repeticiones
    return {
        type: 'GET_REGIONS_LIST',
        payload: regions
    }
}
export function countriesTools(filter, search, order, countries) {
    //FILTER
    const { region, activity } = filter;
    if (region && region !== 'all') {
        countries = countries.filter(country => country.region === region);
    }
    if (activity && activity !== 'all') {
        countries = countries.filter(country => country.activities.find(act => act.name === activity));
    }
    //SEARCH
    if (search && search !== '') {
        countries = countries.filter(c => c.name.toUpperCase().includes(search.toUpperCase()))
    }
    //ORDER
    if (order === 'asc') {
        countries.sort(function (a, b) {
            const A = a.name.toUpperCase();
            const B = b.name.toUpperCase();
            // **** Sorting non-ASCII characters
            // if (A.localeCompare(B)) return -1; 
            // if (B.localeCompare(A)) return 1;
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;   // Son iguales
        });
    };
    if (order === 'des') {
        countries.sort(function (a, b) {
            const A = a.name.toUpperCase();
            const B = b.name.toUpperCase();
            if (A < B) return 1;
            if (A > B) return -1;
            return 0;   // Son iguales
        });
    };
    if (order === 'popUp') {
        countries.sort(function (a, b) {
            const A = a.population;
            const B = b.population;
            if (A < B) return 1;
            if (A > B) return -1;
            return 0;   // Son iguales
        });
    };
    if (order === 'popDown') {
        countries.sort(function (a, b) {
            const A = a.population;
            const B = b.population;
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;   // Son iguales
        });
    };
    return {
        type: 'COUNTRIES_TOOLS',
        payload: countries
    }
}
