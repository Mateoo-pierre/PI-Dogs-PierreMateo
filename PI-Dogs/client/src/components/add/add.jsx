import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import actions
import { addDog, getTemps } from '../../actions/actions';

//import components
import { Nav } from "../nav/nav";

//import css
import './add.css';

const validate = (input) => {
    let err = {}
    if(!input.height_max) err.height = 'Este campo no puede estar vacio';
    if(!input.height_min) err.height = 'Este campo no puede estar vacio';
    if(!input.weight_max) err.weight = 'Este campo no puede estar vacio';
    if(!input.weight_min) err.weight = 'Este campo no puede estar vacio';
    if(!input.lifeSpan) err.lifeSpan = 'Este campo no puede estar vacio';
    if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) err.name = 'El nombre solo puede contener letras'
    return err 
};

export const Add = () => {
    
    const[err, setErr] = useState({});
    
    const [input, setInput] = useState({
        name : '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        lifeSpan: '',
        image: '',
        temperament: []
    });  

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    useEffect(() => {
        dispatch(getTemps());
    }, [dispatch]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErr(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    };

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    };

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperament: input.temperament.filter( e => e !== el)
        })
    };

    const handleSubmit = (e) => {
            if(!err.name && !err.height && !err.weight && !err.lifeSpan){
            e.preventDefault();
            dispatch(addDog(input));
            alert('Raza creada!');
            setInput({
                name : '',
                height_min: '',
                height_max: '',
                weight_min: '',
                weight_max: '',
                lifeSpan: '',
                image: '',
                temperament: []
            });
        } else {
            e.preventDefault()
            alert('Tienes campos vacios')
        }
    }

    return(
        <>
            <Nav/>
            <hr  className = 'hr_add_add'/>
                <div className = 'div_add_one'>
                    <h1 className = 'title_add'>CREAR RAZA</h1>
                        <form onSubmit = {e => handleSubmit(e)} className = 'form_add'>
                            <div className = 'div_add_name'>
                                <input type="text" value = {input.name} name = 'name' onChange = {e => handleChange(e)} placeholder = 'Nombre' className = 'input_add_name'/>
                                {!err.name ? null : <span><p className = 'name_error_add'>{err.name}</p></span>}
                            </div>
                            <div className = 'div_add_height'>
                                <input 
                                type="number" 
                                value = {input.height_max} 
                                name = 'height_max' 
                                className = 'input_add_height_metric' 
                                placeholder = 'Altura min cm'
                                onChange = {e => handleChange(e)}
                                />
                                <input
                                 type="number" 
                                 value = {input.height_min} 
                                 name="height_min" 
                                 className = 'input_add_height_imperial' 
                                 placeholder = 'Altura max cm'
                                 onChange = {e => handleChange(e)}
                                 />
                                 {!err.height? null :<p className = 'height_error_add'>{err.height}</p>}
                            </div>
                            <div className = 'div_add_weight'>
                                <input type="number" 
                                value = {input.weight_max} 
                                name = 'weight_max' 
                                className = 'input_add_weight_metric'
                                placeholder = 'Peso min kg'
                                onChange = {e => handleChange(e)}
                                />
                                <input 
                                type="number" 
                                value = {input.weight_min} 
                                name="weight_min"  
                                className = 'input_add_weight_imperial' 
                                placeholder = 'Peso max kg'
                                onChange = {e => handleChange(e)}
                                />
                                {!err.height? null :<p className = 'weight_error_add'>{err.weight}</p>}
                            </div>
                            <div className = 'div_add_lifeSpan'>
                                <input 
                                type="number" 
                                value = {input.life_span} 
                                name="lifeSpan" 
                                className = 'input_add_lifeSpan' 
                                placeholder = 'Esperanza de vida' 
                                onChange = {e => handleChange(e)}
                                />
                                {!err.lifeSpan? null :<p className = 'lifeSpan_error_add'>{err.lifeSpan}</p>}
                            </div>
                            <div className = 'div_add_img'>
                                <input 
                                type="text" 
                                value = {input.image} 
                                name="image" 
                                className = 'input_add_img'
                                placeholder = 'URL Imagen' 
                                onChange = {e => handleChange(e)}
                                />
                            </div>
                            <div>
                                <select onChange = {e => handleSelect(e)} className = 'select_add_temps'>
                                    <option value="temperaments">Temperamentos</option>
                                    {temperaments.map(e => {
                                        return <option value={e.name}>{e.name}</option>
                                    })}
                                </select>
                                <ul className = 'ul_add'>
                                    {input.temperament.map(e => {
                                        return (
                                            <div className = 'div_add_temps'>
                                                <li className = 'li_add'>{e}</li> 
                                                <button className = 'button_delete_temp' onClick = {() => handleDelete(e)}>x</button> 
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div>
                                <button className = 'buton_add_dog' type = 'submit'>Agregar </button>
                            </div>
                        </form>
            </div>
        </>
    )
}