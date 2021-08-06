const { Router } = require('express');
const axios = require('axios') 
const {Dog} = require('../db')

const router = Router();

router.get('/dogs',async (req, res) => {
  try{
    const dog = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7');
    res.send(dog.data);
    console.log('primero');
  } catch(e) {
    res.send('error');
  }
  // .then(response => {
  //   let dogsResponse = response;
  //   return res.send(dogsResponse);
  // })
  // .catch(err => console.log(err));
});

router.get('/dogs/query', async (req, res) => {
  const {name} = req.query;
    const dog = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7');
      const condition = dog.data.filter(e => e.name === name);
  if(condition.length > 0){
    res.send(condition);
  }
  else{
    res.status(400).send( 'error, nombre no encontrado')
  }
});

router.get('/dogs/:id', async (req, res) => {
  const {id} = req.params;
  const dog = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=c58f6175-7490-40c2-ba34-f7075d7b54a7');
  console.log(dog.data);
  const condition = dog.data.filter(e => e.id == id);
  if(condition.length > 0){
    res.send(condition);
  }
  else{
    res.status(400).send( 'error, perro no encontrado')
  }

});



module.exports = router;