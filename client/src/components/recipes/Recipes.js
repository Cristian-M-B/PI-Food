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
        healthScore={recipe.healthScore}
        diets={recipe.diets}
        dishTypes={recipe.dishTypes} />)
        : <div className='containerSpinner'><span className='spinner'></span></div>
        }
    </div>
    : <div className='containerMessage'><h2 className='recipesNoMatches'>The recipe searched not exist!</h2></div>
}