import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './Form.css';

export default function Form () {
    const allTypes = useSelector(state => state.types);
    const history = useHistory();
    const diets = [];
    const [input, setInput] = useState({
        name: "",
        score: 0,
        healthScore: 0,
        image: "",
        summary: ""
    });

    function handleOnChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleDiets(e){
        
    }

    async function postRecipe(recipe){
        let {name, image, score, healthScore, summary, diets} = recipe;
        try {
            await axios.post(`http://localhost:3001/api/recipes/`, {
                name,
                image,
                score,
                healthScore,
                summary,
                diets
            })
        } catch(error){
            console.log(error);
        }
    }

    function handleOnSubmit(e){
        e.preventDefault();
        postRecipe({...input, diets});
        setInput({
            name: "",
            score: 0,
            healthScore: 0,
            image: "",
            summary: "",
        })
        alert("Recipe Successfully Created")
        history.push('/home/recipes');
    }

    return <div className='recipeForm'>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor='name'>*Name: </label>
            <input type='text' id='name' name='name' required
                value={input.name} onChange={handleOnChange} />
            <hr />
            <label htmlFor='score'>Score: </label>
            <input type='number' id='score' name='score' min='0' max='100'
                value={input.score} onChange={handleOnChange} />
            <hr />
            <label htmlFor='healthScore'>HealthScore: </label>
            <input type='number' id='healthScore' name='healthScore' min='0' max='100'
                value={input.healthScore} onChange={handleOnChange} />
            <hr />
            <label htmlFor='image'>Image (URL): </label>
            <input type='url' id='image' name='image'
                value={input.image} onChange={handleOnChange} />
            <hr />
            <label htmlFor='summary'>*Summary: </label>
            <textarea type='text' id='summary' name='summary' required rows='10' cols='50'
                value={input.summary} onChange={handleOnChange} />
            <hr />
            <div>
                {allTypes?.map((type, index) => <div key={type}><input type='checkbox' id={type} value={index} onChange={handleDiets} /><label htmlFor={type}>{type}</label></div>)}
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    </div>
}