const { Router, response } = require('express');
const axios = require('axios') 
const {Dog, Temperament} = require('../db')
const { v4: uuid4} = require('uuid');

const router = Router();

router.get('/dogs',async (req, res, next) => {

  const {name} = req.query;
  
  try{
    const dogDb = await Dog.findAll({
      include: {
        model: Temperament,
        attributes:['name'],
        through: {
          attributes: [],
        },
      }
    });
    const dataDog = dogDb.map(e => {
      console.log(e);
      return {
        img: e.dataValues.image,
        name: e.dataValues.name,
        temperament: e.dataValues.temperaments,
      }
    });

    const dogApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7')
    const apiDog = dogApi.data.map(e => {
      return {
        img: e.image,
        name: e.name,
        temperament: e.temperament
      }
    });

    if(!name){
      const getData = apiDog.concat(dataDog);
      res.send(getData)
    }
    
    if(name){
      const conditionApi = dogApi.data.find(e => e.name.toLowerCase() === name.toLowerCase());
      const conditionDb = dogDb.find(e => e.name.toLowerCase() === name.toLowerCase());
      if(conditionApi){
        const apiDog = dogApi.data.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        res.send(apiDog);
      }
      if(conditionDb){
        const dbDog = dogDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        res.send(dbDog);
      }
      else{
        res.status(400).send('No results')
      }
      // .then(response => {
        //   let dogsResponse = response;
        //   return res.send(dogsResponse);
        // })
        // .catch(err => console.log(err));
    };
  }catch(e){
    next(e);
  };
});


router.get('/dogs/:idRaza', async (req, res, next) => {

  const {idRaza} = req.params;

  try{

    const dbDog = await Dog.findAll({
      include: {
        model: Temperament,
        attributes:['name'],
        through: {
          attributes: [],
        },
      }
    });

    const apiDog = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7');
  
    const apiDogFind = apiDog.data.find(e => e.name == idRaza);
    const dbDogFind = dbDog.find(e => e.name == idRaza);
    
    if(apiDogFind){

      const dogApi = apiDog.data.filter(e => e.name == idRaza);
      const dataDog = dogApi.map(e => {
        return {
          img: e.image,
          name: e.name,
          temperament: e.temperament,
          height: e.height,
          weight: e.weight,
          life_span: e.life_span
        }
      });

      res.send(dataDog);
    }
    if(dbDogFind){

      const dogDb = dbDog.filter(e => e.name == idRaza);
      const dataDog = dogDb.map(e => {
        return {
          image: e.dataValues.image,
          name: e.dataValues.name,
          temperament: e.dataValues.temperaments,
          height: {
            imperial: e.dataValues.height_imperial,
            metric: e.dataValues.height_metric
          },
          weight: {
            imperial: e.dataValues.weight_imperial,
            metric: e.dataValues.weight_metric
          },
          life_span: e.dataValues.lifeSpan
        }
      });
      
      res.send(dataDog);
    }
  }catch(e){
    next(e);
  }
});


router.post('/dog', async (req, res, next) => {

  const {name, height_imperial, weight_imperial,height_metric, weight_metric,lifeSpan, image, temperament} = req.body;

  try{

    const id = uuid4();
    const newDog = await Dog.create({
      id,
      name : name,
      height_metric: height_metric,
      height_imperial: height_imperial,
      weight_metric: weight_metric,
      weight_imperial: weight_imperial,
      lifeSpan: lifeSpan,
      image: image,
    });

    const temp = await Temperament.findAll({
      where: {
        name : temperament
      }
    })

    newDog.addTemperament(temp) 
    res.send('Raza creada con exito');
  }catch(e){
    next(e);
  }
});



module.exports = router;