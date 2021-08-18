import React from "react";

//import css
import './paginado.css'

export  function Paginado({dogsPage, allDogs, paginado}){
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allDogs/dogsPage); i++){
        pageNumber.push(i)
    }

    return(
        <>
            <div>
                <ul className = 'ul_paginado'>
                    {
                        pageNumber && 
                        pageNumber.map( num => (
                            <a  className = 'a_paginado' onClick = {() => paginado(num)}>{num}</a>
                        ))}
                </ul>
            </div>
        </>
    )
};