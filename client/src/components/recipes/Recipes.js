// import { useEffect } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import { getRecipes } from '../../redux/actions/index.js';
import Recipe from '../recipe/Recipe.js';
import './Recipes.css';

export default function Recipes ({currentRecipes}) {
    // const dispatch = useDispatch();
    // const recipes = useSelector(state => state.recipes);

    // useEffect(() => {
    //     dispatch(getRecipes())
    // }, [dispatch])

    // const recipes = useSelector(state => state.recipes);
    return Array.isArray(currentRecipes) ? 
    <div className="recipesCards">
        {currentRecipes.length ?
        currentRecipes.map(recipe => <Recipe 
        recipe={recipe}
        key={recipe.id} />)
        : <h1>{'LOADING ...'}</h1>
        }
    </div>
    : <h3>{'NO MATCHES'}</h3>
}