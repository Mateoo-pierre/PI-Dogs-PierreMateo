import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";

//import actions
import { getName } from "../../actions/actions";

//import css
import './nav.css'

export const Nav = () => {

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    
    const handleInput = e => {
        e.preventDefault()
        setSearch(e.target.value)
    };

    const handleSubmit = e => {
        e.preventDefault(); 
        dispatch(getName(search));
        setSearch('');
    }; 

    return(
        <>
            <div className = 'div_nav'>
                <nav className = 'nav'>
                    <Link to = '/home'>
                        <h1 className = 'title_nav'>Henry Dogs</h1>
                    </Link>
                    <Link to = '/home'>
                        <p className = 'p_home_nav'>Home</p>
                    </Link>
                    <Link to = '/add'>
                        <div className = 'div_add_home'>
                        <p className = 'p_add_nav'>Agregar raza</p>
                        </div>
                    </Link>
                    <div className = 'search_home'>
                <form onSubmit={e => handleSubmit(e)}>
                    <input onChange = {e => handleInput(e)} className = 'input_search_home' placeholder = 'Buscar...' type="text" />
                    <button className = 'buton_search_home'  type= 'submit'>Buscar</button>
                </form>
            </div>
                </nav>
            </div>  
        </>
    )
};