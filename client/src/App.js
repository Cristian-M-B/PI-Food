import { useEffect } from 'react';
import {Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Landing from './components/landing/Landing.js';
import NavBar from './components/navBar/NavBar.js';
import Home from './components/home/Home.js';
import Detail from './components/detail/Detail.js';
import Form from './components/form/Form.js';
import Footer from './components/footer/Footer.js'
import { getDbRecipes, getRecipes, getTypes } from './redux/actions/index.js';
import './App.css';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL =  process.env.REACT_APP_API || 'http://localhost:3001';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getTypes())
    dispatch(getDbRecipes())
}, [dispatch])

  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={NavBar} />
      <Route exact path='/home/recipes' component={Home} />
      <Route exact path='/home/detail/:id' component={Detail} />
      <Route exact path='/home/create' component={Form} />
      <Route path='/home' component={Footer} />
    </div>
  );
}

export default App;
