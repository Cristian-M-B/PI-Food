
import {useSelector} from 'react-redux';

import Recipe from '../recipe/Recipe.js';

export default function Recipes () {

    const recipes = useSelector(state => state.recipes);

    return <div className="recipesCard">
        {recipes?.map(recipe => <Recipe 
        recipe={recipe}
        key={recipe.id} />)}
    </div>
}