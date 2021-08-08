const {Router} = require('express');
const axios = require('axios');
const {Temperament} = require('../db');

const router = Router();

router.get('/temperament', async(req, res, next) => {
    
    try{
        let newArray = [];
        let arrayTemp = [];
        const dog = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7');
        dog.data.forEach(async(e) => {
            if(e.temperament){
                let a = e.temperament;
                separador = ', ';
                let h = a.split(separador) 
                newArray.push(h)
            }
        });
        newArray.forEach(async(e) => {
            let  i = 0;
            arrayTemp.push(e[i]);
            i++;
        });
        const tempUnicos = arrayTemp.filter((value, index) => {
            return arrayTemp.indexOf(value) === index;
        });
        tempUnicos.forEach(async (e) => {
            const [name, created] = await Temperament.findOrCreate({
                where: {name : e}
            }) 
        } )
        
    const Temps = await Temperament.findAll();
    res.send(Temps); 
        
    }catch(e){
        next(e)
    }
});

module.exports = router 