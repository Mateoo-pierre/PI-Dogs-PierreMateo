import React from 'react';
import {Link} from 'react-router-dom';

//import css
import './cardDetails.css'

export const CardDetails = ({image, name, temperament, height, weight, lifeSpan}) => {
    return (
        <> 
            <div className = 'div_cardetails'>
                <Link to = '/home'>
                    <a href="javascript: history.go(-1)">
                <img width = '5%' src="https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png" className = 'back_details' alt="" />
                    </a>
                </Link>
            <div className = 'div_cardetails_two'>
                <div className = 'div_details_name'>
                    <h1 className = 'details_name'>{name}</h1>
                </div>
                <div className = 'div_details_temps'>
                </div>
                <div className = 'div_details_img'>
                    <h3 className = 'details_temps'>{temperament}</h3>
                    <img  className = 'details_img' src={image} alt="" />
                </div>
                <div className = 'div_one_cardDetails'>
                        <img className = 'img_height' width = '4%' src="https://img.icons8.com/ios/500/height.png" alt="" />
                    <div className = 'div_height'>
                        <p>Altura</p>
                        <p>{height}</p>
                        <p>cm</p>
                    </div>
                    <img className = 'img_weight' width = '3%' src="http://cdn.onlinewebfonts.com/svg/img_332986.png" alt="" />
                    <div className = 'div_weight'>
                        <p>Peso</p>
                        <p>{weight}</p>
                        <p>kg</p>
                    </div>
                    <img className = 'img_lifespan' width = '4%' src="https://static.thenounproject.com/png/3696732-200.png" alt="" />
                    <div className = 'div_lifespan'>
                        <p>Largo de vida</p>
                        <p>{lifeSpan}</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
};