import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import './Recipe.css';

export default function Recipe({ id, name, image, healthScore, diets, dishTypes }) {
    return <div className="recipeCard">
        <Link className='recipeA' to={`/home/detail/${id}`}>
            <h3 className='recipeH3'>{name}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FiStar style={{ width: '50px', height: '50px', color: 'var(--secondary-color)' }} />
                <p style={{ fontSize: '12px', color: 'var(--secondary-color', position: 'relative', left: healthScore < 10 ? '-28px' : healthScore > 9 && healthScore < 100 ? '-31.5px' : '-35px' }}>{healthScore}</p>
            </div>
        </Link>
        {image ?
            <img src={image} alt="Not Found" />
            : <img src="https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg" alt="Not Found" />
        }
        {Array.isArray(diets) && diets[0] &&
            <div>
                <h4 className='recipeH4'>Diets Types</h4>
                {diets.map((diet, index) => <p key={index} className='recipeP'>{diet}</p>)}
            </div>
        }
        {/* {Array.isArray(dishTypes) && dishTypes[0] &&
            <div>
                <h4 className='recipeH4'>Dish Types</h4>
                {dishTypes.map((dish, index)=> <p key={index} className='recipeP'>{dish}</p>)}
            </div>
        } */}
    </div>
}