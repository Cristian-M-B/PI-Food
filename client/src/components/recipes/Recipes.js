import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getRecipes } from '../../redux/actions/index.js';
import Recipe from '../recipe/Recipe.js';
import './Recipes.css';

export default function Recipes () {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    // const recipes = useSelector(state => state.recipes);

    return <div className="recipesCards">
        {recipes?.map(recipe => <Recipe 
        recipe={recipe}
        key={recipe.id} />)}
    </div>
}