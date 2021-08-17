import Recipe from '../recipe/Recipe.js';
import './Recipes.css';

export default function Recipes ({currentRecipes}) {

    return Array.isArray(currentRecipes) ? 
    <div className="recipesCards">
        {currentRecipes.length ?
        currentRecipes.map((recipe, index) => <Recipe 
        key={index} 
        id={recipe.id}
        name={recipe.name}
        image={recipe.image}
        score={recipe.score}
        diets={recipe.diets}
        dishTypes={recipe.dishTypes} />)
        : <span className='spinner'></span>
        }
    </div>
    : <h1 className='recipesNoMatches'>{'NO MATCHES'}</h1>
}