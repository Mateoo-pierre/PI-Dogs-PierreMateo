import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react'
import { useParams } from "react-router";

//import actions
import {dogDetails} from '../../actions/actions';

//import components
import {Nav} from '../nav/nav';
import { CardDetails } from "../cardDetails/cardDetails";

//import css
import './details.css'

export const Details = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const details = useSelector((state) => state.dogDetails)
    useEffect(() => {
        dispatch(dogDetails(id))
    }, [dispatch, id])
    
    return(
        <>
            <div>
                <Nav/>  
                {
                    details.map(e => {
                        let temp = '';
                        if(Array.isArray(e.temperament) === true){
                            temp = e.temperament.map(e => e.name + ', ')
                        }else {
                            temp = e.temperament
                        }
                        return (
                            <CardDetails 
                            key = {e.id}
                            name = {e.name}
                            image = {e.img.url}
                            temperament = {temp}
                            height = {e.height.metric}
                            weight = {e.weight.metric}
                            lifeSpan = {e.life_span}
                            />
                    )})
                }
            </div>
        </>
    )
};