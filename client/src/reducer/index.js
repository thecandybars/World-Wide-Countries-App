// import React from "react";

const initialState = {
    countries: [],
    countryDetails: [],
    activitiesList: [],
    regionsList: [],
};

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_COUNTRIES':
            return ({ ...state, countries: payload });
        case 'GET_COUNTRY_DETAIL':
            return ({ ...state, countryDetails: payload });
        case 'GET_ACTIVITIES_LIST':
            return ({ ...state, activitiesList: payload });
        case 'GET_REGIONS_LIST':
            return ({ ...state, regionsList: payload });
        case 'COUNTRIES_TOOLS':
            return ({ ...state, countries: payload });

        default: return state;
    }
}


export default rootReducer;