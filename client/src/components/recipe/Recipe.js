import {Link} from 'react-router-dom';
import './Recipe.css';

export default function Recipe({ id, name, image, score, diets, dishTypes }) {
    return <div className="recipeCard">
        <Link className='recipeA' to={`/home/detail/${id}`}>
            <h3 className='recipeH3'>{name}</h3>
        </Link>
        {image ?
            <img src={image} alt="Not Found"/>
            : <img src="https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg" alt="Not Found"/>
        }
        {Array.isArray(diets) && diets[0] &&
            <div>
                <h4 className='recipeH4'>Diets Types</h4>
                {diets.map((diet, index) => <p key={index} className='recipeP'>{diet}</p>)}
            </div>
        } 
        {Array.isArray(dishTypes) && dishTypes[0] &&
            <div>
                <h4 className='recipeH4'>Dish Types</h4>
                {dishTypes.map((dish, index)=> <p key={index} className='recipeP'>{dish}</p>)}
            </div>
        }
    </div>
}