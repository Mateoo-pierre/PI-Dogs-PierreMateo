import { GET_DOGS, FILTER, GET_BY_NAME, ADD_DOG, GET_TEMPERAMENTS, FILTER_WEIGHT, FILTER_NAME, FILTER_TEMP, DOG_DETAILS } from "../actions/constants";

let initialState = {
    dogs : [],
    allDogs : [],
    dogDetails : [],
    temperaments : []
};

const root = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS :
            return {
                ...state,
                dogs: action.payload,
                allDogs : action.payload
            }
            case FILTER :
                const allDogs = state.allDogs;
                const filter = action.payload === 'todos' ? allDogs : allDogs.filter(e => {
                    if(action.payload === 'agregada'){
                        return e.status 
                    }
                    if(action.payload === 'existente'){
                        return !e.status
                    }
                    else {
                        console.log(action.payload);
                        return e.temperament === action.payload
                    }
                });
                return {
                    ...state,
                    dogs: filter
                };
            case FILTER_TEMP : 
                const temp = action.payload === 'todos' ? state.allDogs : state.allDogs.filter( e => {
                    console.log(e);
                    if(e.temperament){
                        const espacio = ', ';
                        if(Array.isArray(e.temperament)){
                            return e.temperament.find(e => e.name === action.payload)
                        }
                       return e.temperament.split(espacio).find(e => e === action.payload) 
                    }
                })
                return {
                    ...state,
                    dogs: temp
                }    
            case GET_BY_NAME : 
                return {
                    ...state,
                dogs: action.payload
            };
        case ADD_DOG :
            return {
                ...state
            };
        case GET_TEMPERAMENTS : 
            return {
                ...state,
                temperaments: action.payload
            };     
        case FILTER_NAME :
            const filterByName = action.payload === 'az' ?
                state.dogs.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a, b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0;
                });
            const filterName = filterByName.map(e => e)    
                return {
                    ...state,
                    dogs: filterName
                } ;
            case FILTER_WEIGHT : 
                const filterByWeight = action.payload === 'menor' ?
                state.allDogs.sort(function(a, b) {
                    console.log(a);
                    if(a.weight.metric > b.weight.metric) {
                        return 1;
                    }
                    if(b.weight.metric > a.weight.metric) {
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a, b) {
                    if(a.weight.metric[0] > b.weight.metric[0]) {
                        return -1;
                    }
                    if(b.weight.metric[0] > a.weight.metric[0]) {
                        return 1
                    }
                    return 0;
                });
            const filterWeight = filterByWeight.map(e => e)
            return {
                ...state,
                dogs: filterWeight
            }   
        case DOG_DETAILS : 
            return{
                ...state,
                dogDetails : action.payload
            }
        default :
            return state;
    }
};

export default root;