import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

//import actions
import { getDog, filter, getTemps, filterName, filterWeight, filterTemp } from "../../actions/actions";

//imort components
import { Card } from "../card/card";
import { Nav } from "../nav/nav";
import { Paginado } from "../paginado/paginado";

//import css
import './home.css'

export const Home = () => {

const dispatch = useDispatch();
const allDogs = useSelector ((state) => state.dogs);
const temperaments = useSelector ((state) => state.temperaments);

useEffect (() => {
    dispatch(getDog());
}, [dispatch]);

useEffect(() => {
    dispatch(getTemps());
}, [dispatch]);

const handleFilter = (e) => {
    dispatch(filter(e.target.value));
};

const handleFilterName = (e) => {
    dispatch(filterName(e.target.value))
};

const handleFilterweight = (e) => {
    dispatch(filterWeight(e.target.value))
};

const handleFilterTemp = (e) => {
    dispatch(filterTemp(e.target.value))
};

//pagination
const [acutalPage, setActualPage] = useState(1);
const [dogsPage]  = useState(9);
const iLastDog = acutalPage * dogsPage;
const iFirstDog = iLastDog - dogsPage;
const currentDog = allDogs.slice(iFirstDog,iLastDog)

const paginado = (pageNumer) => {
    setActualPage(pageNumer)
}

return(
    <>
        <Nav/>
        <hr  className = 'hr_home_home'/>
            <div className = 'select_div_home'>
                <select className = 'select_home' onChange = {e => handleFilterName(e)}>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select className = 'select_home_one' onChange = {e => handleFilterweight(e)}>
                    <option value="todos">Peso</option>
                    <option value="menor">Menor peso</option>
                    <option value="mayor">Mayor peso</option>
                </select>
                <select className = 'select_home_two' onChange = {e => handleFilterTemp(e)}>
                    <option value="todos">Temperamentos</option>
                    {temperaments.map(e => {
                        return <option value={e.name}>{e.name}</option>
                    })}
                </select>
                <select className = 'select_home_three' onChange = {e => handleFilter(e)}>
                    <option value="todos">Todos</option>
                    <option value="existente">Existente</option>
                    <option value="agregada">Agregada</option>
                </select>
            </div>
            <div className = 'div_card_container'>
                {  
                    currentDog.map( e => {
                        let temp = '';
                        if(Array.isArray(e.temperament) === true){
                            temp = e.temperament.map(e => e.name + ', ')
                        }else {

                            temp = e.temperament
                        }
                        return(
                            <Card
                            id = {e.id}
                            name = {e.name}
                            image = {e.img.url}
                            temperament = {temp}
                            status = {e.status}
                            key = {e.id}
                            />
                        )
                    })
                }
            </div>
            <div className = 'paginado'>
                <Paginado 
                dogsPage = {dogsPage}
                allDogs = {allDogs.length}
                paginado = {paginado}
                />
            </div>
        </>
    )
};