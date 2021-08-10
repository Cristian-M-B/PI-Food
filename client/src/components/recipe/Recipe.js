import {Link} from 'react-router-dom';
import './Recipe.css';

export default function Recipe({ recipe }) {
    return <div className="recipeCard">
        <Link to={`/home/detail/${recipe.id}`}>
            <h3>{recipe.name}</h3>
        </Link>
        {recipe.image ?
            <img src={recipe.image} alt="Not Found" height='230' width='300'/>
            : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9slf6wR4ob-ePI4hoLlwd3y4krnGhgFMBg&usqp=CAU" alt="Not Found" height='230' width='300'/>
        }
        {/* {recipe.diets ?
            <div>
                <h4>Diets</h4> */}
                {recipe.diets.map(diet => <p key={diet}>{diet}</p>)}
            {/* </div>
            :null
        } */}
        {recipe.dishTypes &&
            <div>
                <h4>DishTypes</h4>
                {recipe.dishTypes.map(dish => <p key={dish}>{dish}</p>)}
            </div>
            // : null
        }
    </div>
}