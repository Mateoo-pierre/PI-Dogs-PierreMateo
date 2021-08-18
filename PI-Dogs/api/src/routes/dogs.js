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
      return {
        img: {url : e.dataValues.image},
        name: e.dataValues.name,
        height: {metric: e.dataValues.height_max + ' - ' + e.dataValues.height_min},
        weight: {metric : e.dataValues.weight_max + ' - ' + e.dataValues.weight_min},
        temperament: e.dataValues.temperaments,
        status: e.dataValues.status,
        id : e.dataValues.id
      }
    });
  
    
    const dogApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7')
    const apiDog = dogApi.data.map(e => {
      return {
        img: e.image,
        name: e.name,
        height: e.height,
        weight: e.weight,
        temperament: e.temperament,
        id: e.id
      }
    });
    
    if(!name){
      const getData = apiDog.concat(dataDog);
      res.send(getData)
    }
    
    if(name){
      
      const conditionApi = dogApi.data.find(e => e.name.toLowerCase().includes(name.toLowerCase()));
      const conditionDb = dogDb.find(e => e.name.toLowerCase().includes(name.toLowerCase()));

      if(conditionApi || conditionDb){
        const apiDog = dogApi.data.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        const dataDog = apiDog.map(e => {
          return {
            img: {url : e.image.url},
            name: e.name,
            temperament: e.temperament,
            id: e.id
          }
        });
        const dbDog = dogDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        const dogData = dbDog.map(e => {
          return {
            img: {url : e.dataValues.image},
            name: e.dataValues.name,
            temperament: e.dataValues.temperaments,
            status: e.dataValues.status,
            id : e.dataValues.id
          }
        });
        res.send(dataDog.concat(dogData));
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
      
      const apiDogFind = apiDog.data.find(e => e.id == idRaza);
      const dbDogFind = dbDog.find(e => e.dataValues.id == idRaza);
      console.log(dbDogFind);
    
    if(apiDogFind){

      const dogApi = apiDog.data.filter(e => e.id == idRaza);
      const dataDog = dogApi.map(e => {
        return {
          img: e.image,
          name: e.name,
          temperament: e.temperament,
          height: e.height,
          weight: e.weight,
          life_span: e.life_span,
          id: e.id
        }
      });

      res.send(dataDog);
    }
    if(dbDogFind){

      const dogDb = dbDog.filter(e => e.dataValues.id == idRaza);
      const dataDog = dogDb.map(e => {
        return {
          img: {url :e.dataValues.image},
          name: e.dataValues.name,
          temperament: e.dataValues.temperaments,
          height: {
            metric: e.dataValues.height_max + ' - ' + e.dataValues.height_min
          },
          weight: {
            metric: e.dataValues.weight_max + ' - ' + e.dataValues.weight_min
          },
          life_span: e.dataValues.lifeSpan + ' years',
          id : e.dataValues.id
        }
      });
      
      res.send(dataDog);
    }
  }catch(e){
    next(e);
  }
});


router.post('/dog', async (req, res, next) => {

  const {name, height_min, weight_max,height_max, weight_min,lifeSpan, image, temperament} = req.body;

  try{

    const id = uuid4();
    const newDog = await Dog.create({
      id,
      name : name,
      height_min: height_min,
      height_max: height_max,
      weight_min: weight_min,
      weight_max: weight_max,
      lifeSpan: lifeSpan,
      image: image,
    });

    const temp = await Temperament.findAll({
      where: {
        name : temperament
      }
    })

    newDog.addTemperament(temp) 
    res.send(newDog);
  }catch(e){
    next(e);
  }
});



module.exports = router;