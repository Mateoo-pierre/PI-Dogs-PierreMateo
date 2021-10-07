import React from 'react';
import {Link} from 'react-router-dom';

//import css
import './card.css'

export const Card = ({id, image, name, temperament}) => {
    return(
        <>
        <div className = 'div_container_card'>
            <div className ='div_card'>
            <Link to = {`/details/${id}`}>
                <img src={image} width = '200px' height = '250px' alt = '' />
                <h3 className = 'card_title'>{name}</h3>
                <h5 className = 'card_temperament'>{temperament}</h5>
            </Link>
            </div>
        </div>
        </>
    )
};
