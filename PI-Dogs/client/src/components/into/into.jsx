import React from "react";
import { Link } from "react-router-dom";

//import css
import './into.css'

export const Into = () => {
   return(
            <div className = 'background_into'>
            <div className = 'div_into'>
                <div className = 'div_into_one'>
            <h1 className = 'title_into'>Henry Dogs</h1>
            <p className = 'p_into'>El perro es un animal mamífero y cuadrúpedo que fue domesticado hace unos 10.000 años y que, actualmente, convive con el hombre como una mascota. Su nombre científico es Canis lupus familiaris.</p>
            <div className='div_buton_into'>
                <Link to = '/home'>
                <h3 className = 'buton_into'>Ingresar</h3>
                </Link>
            </div>
                </div>
            <img src="https://animaleshoy.net/wp-content/uploads/2016/03/cachorros-diferentes-razas.jpg"  className='img_into' alt="no cargo :(" />
            </div>
            </div>
   ) 
}