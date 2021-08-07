import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import './Form.css';

export default function Form () {

    const history = useHistory();
    const [input, setInput] = useState({
        name: "",
        score: 0,
        healthScore: 0,
        image: "",
        summary: "",
        // diets: []
        // dishTypes: [],
        // steps: []
    });

    function handleOnChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    async function postRecipe(input){
        let {name, image, score, healthScore, summary} = input;
        try {
            await axios.post(`http://localhost:3001/api/recipes/`, {
                name,
                image,
                score,
                healthScore,
                summary
            })
        } catch(error){
            console.log(error);
        }
    }

    function handleOnSubmit(e){
        e.preventDefault();
        postRecipe(input);
        setInput({
            name: "",
            score: 0,
            healthScore: 0,
            image: "",
            summary: "",
            // diets: []
        })
        alert("Recipe Successfully Created")
        history.push('/home/recipes');
    }

    return <div className='recipeForm'>
        <form onSubmit={handleOnSubmit}>
            <input type='text' placeholder='Name' name='name' required value={input.name} onChange={handleOnChange} />
            <input type='number' placeholder='Score' name='score' value={input.socre} onChange={handleOnChange} />
            <input type='number' placeholder='HealthScore' name='healthScore' value={input.healthScore} onChange={handleOnChange} />
            <input type='url' placeholder='URL Image' name='image' value={input.image} onChange={handleOnChange} />
            <input type='text' placeholder='Summary' name='summary' required value={input.summary} onChange={handleOnChange} />
            {/* <select name='diets' multiple>
                <opcion value="1">Vegetariano</opcion>
                <opcion value="vegano" label="Vegano"></opcion>
            </select> */}
            <button type="submit">Add Recipe</button>
        </form>
    </div>
}