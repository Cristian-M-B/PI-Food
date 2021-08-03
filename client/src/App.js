import {Route, Switch} from 'react-router-dom';
// import {useDispatch} from 'react-redux';
// import {useEffect} from 'react';
import Landing from './components/landing/Landing.js';
import NavBar from './components/navBar/NavBar.js';
// import getRecipes from './redux/actions/index.js';
import './App.css';

function App() {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getRecipes())
  // }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/'>
          <NavBar />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
