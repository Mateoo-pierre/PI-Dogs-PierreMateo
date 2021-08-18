import axios from 'axios';

//import constants
import {GET_DOGS, FILTER, GET_BY_NAME, FILTER_NAME, GET_TEMPERAMENTS, FILTER_WEIGHT, DOG_DETAILS, FILTER_TEMP} from './constants'

export const getDog = () => {
    return async function (dispatch){
        const json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }
};

export const filter = (payload) => {
    return {
        type: FILTER,
        payload
    }
};

export const getName = (payload) => {
        return async function (dispatch){
        const json = await axios.get(`http://localhost:3001/dogs?name=${payload}`);
        return dispatch({
            type: GET_BY_NAME,
                payload: json.data
            })
        }
};

export const addDog = (payload) => {
    return async function (dispatch){
        const json = await axios.post('http://localhost:3001/dog', payload)
        return json;
    }
};

export const getTemps = () => {
    return async function (dispatch){
        const json = await axios.get('http://localhost:3001/temperament');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        })
    }
};

export const filterName = (payload) => {
    return {
        type: FILTER_NAME,
        payload
    }
};

export const filterWeight = (payload) => {
    return {
        type : FILTER_WEIGHT,
        payload
    }
};

export const filterTemp = (payload) => {
    return {
        type: FILTER_TEMP,
        payload
    }
}

export const dogDetails = (payload) => {
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/dogs/${payload}`);
        return dispatch({
            type: DOG_DETAILS,
            payload: json.data
        })
    }
}