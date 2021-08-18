import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

//import css
import './App.css';

//import component
import { Into } from './components/into/into';
import {Home} from './components/home/home';
import {Details} from './components/details/details'
import {Add} from './components/add/add'

function App() {
  return (
    <BrowserRouter>
      <>
        <Route exact path = '/' component = {Into} />
        <Route exact path = '/home' component = {Home} />
        <Route exact path = '/details/:id' component = {Details} />
        <Route exact path = '/add' component = {Add} />
      </>
    </BrowserRouter>
  );
}

export default App;
