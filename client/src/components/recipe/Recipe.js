import {Link} from 'react-router-dom';
import './Recipe.css';

export default function Recipe({ recipe }) {
    return <div className="recipeCard">
        <Link to={`/home/detail/${recipe.id}`}>
            <p>{recipe.name}</p>
        </Link>
        {recipe.image? <img src={recipe.image} alt="image not found"/>
        : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9slf6wR4ob-ePI4hoLlwd3y4krnGhgFMBg&usqp=CAU" alt="image not found"/>
        }
        <p>{recipe.diets}</p>
        <p>{recipe.dishTypes}</p>
    </div>
}