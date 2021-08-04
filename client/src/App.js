import {Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Landing from './components/landing/Landing.js';
import NavBar from './components/navBar/NavBar.js';
import Recipes from './components/recipes/Recipes.js';
import Form from './components/form/Form.js';
import getRecipes from './redux/actions/index.js';
import './App.css';

function App() {

  let dispatch = useDispatch();

  useEffect(() => {
      dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={NavBar} />
      <Route exact path='/home/recipes' component={Recipes} />
      <Route exact path='/home/create' component={Form} />
    </div>
  );
}

export default App;
