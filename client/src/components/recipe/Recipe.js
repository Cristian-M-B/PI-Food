import {Link} from 'react-router-dom';
import './Recipe.css';

export default function Recipe({ id, name, image, score, diets, dishTypes }) {
    return <div className="recipeCard">
        <Link to={`/home/detail/${id}`}>
            <h3>{name}</h3>
        </Link>
        {image ?
            <img src={image} alt="Not Found" height='230' width='300'/>
            : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9slf6wR4ob-ePI4hoLlwd3y4krnGhgFMBg&usqp=CAU" alt="Not Found" height='230' width='300'/>
        }
        {Array.isArray(diets) && diets[0] &&
            <div>
                <h4>Diets</h4>
                {diets.map((diet, index) => <p key={index}>{diet}</p>)}
            </div>
        } 
        {Array.isArray(dishTypes) && dishTypes[0] &&
            <div>
                <h4>DishTypes</h4>
                {dishTypes.map((dish, index)=> <p key={index}>{dish}</p>)}
            </div>
        }
    </div>
}