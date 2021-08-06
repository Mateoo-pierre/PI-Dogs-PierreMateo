const {Router} = require('express');
const axios = require('axios');
const {Temperament} = require('../db');

const router = Router();

router.get('/temperament', async(req, res, next) => {
    let newArray = [];
    let arrayTemp = [];
    
    try{
        const dog = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7');
        dog.data.forEach(async(e) => {
            if(e.temperament){
                let a = e.temperament;
                separador = ', ';
                let h = a.split(separador) 
                newArray.push(h)
    
            }
        });
        newArray.forEach(e => {
            let  i = 0;
            arrayTemp.push(e[i]);
            i++
        });
        res.send(arrayTemp)

    }catch(e){
        next(e)
    }
});

module.exports = router 