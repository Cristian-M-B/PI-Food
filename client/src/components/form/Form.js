import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipe } from "../../redux/actions";
import './Form.css';

export default function Form () {
    const dispatch = useDispatch();
    const allTypes = useSelector(state => state.types);
    const [step, setStep] = useState("");
    const [input, setInput] = useState({
        name: "",
        score: 0,
        healthScore: 0,
        image: "",
        summary: "",
        steps: [],
        diets: [],
        dishTypes: []
    });

    function handleOnChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleStep(e){
        setStep(e.target.value)
    }

    function handleAddStep(){
        setInput({
            ...input,
            steps: [...input.steps, step]
        })
        setStep("");
    }

    function handleDiets(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets:[...input.diets, (parseInt(e.target.value)+1)]
            })
        } else {
            setInput({
                ...input,
                diets: input.diets.filter( d => d!== (parseInt(e.target.value)+1))
            })
        }
    }

    function handleDish(e){
        if(e.target.checked){
            setInput({
                ...input,
                dishTypes:[...input.dishTypes, e.target.value]
            })
        } else {
            setInput({
                ...input,
                dishTypes: input.dishTypes.filter( d => d!== e.target.value)
            })
        }
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input));
        setInput({
            name: "",
            score: "",
            healthScore: "",
            image: "",
            summary: "",
            steps: "",
            diets: [],
            dishTypes: []
        })
        alert("Recipe Successfully Created")
    }

    return <div className='recipeForm'>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor='name'>*Name: </label>
            <input type='text' id='name' name='name' required
                value={input.name} onChange={handleOnChange} />
            <hr />
            <label htmlFor='score'>Score: </label>
            <input type='text' id='score' name='score' min='0' max='100'
                value={input.score} onChange={handleOnChange} />
            <hr />
            <label htmlFor='healthScore'>HealthScore: </label>
            <input type='text' id='healthScore' name='healthScore' min='0' max='100'
                value={input.healthScore} onChange={handleOnChange} />
            <hr />
            <label htmlFor='image'>Image (URL): </label>
            <input type='url' id='image' name='image'
                value={input.image} onChange={handleOnChange} />
            <hr />
            <label htmlFor='step'>Steps: </label>
            <input type='text' id='step' name='step'
            value={step} onChange={handleStep} />
            <button onClick={handleAddStep}> Add Step</button>
            <hr/>
            <label htmlFor='summary'>*Summary: </label>
            <textarea type='text' id='summary' name='summary' required rows='10' cols='50'
                value={input.summary} onChange={handleOnChange} />
            <hr />
            <div>
                <input type='checkbox' id='side dish' value='side dish' onChange={handleDish} /><label htmlFor='side dish'>Side Dish</label>
                <input type='checkbox' id='lunch' value='lunch' onChange={handleDish} /><label htmlFor='lunch'>Lunch</label>
                <input type='checkbox' id='dinner' value='dinner' onChange={handleDish} /><label htmlFor='dinner'>Dinner</label>
                <input type='checkbox' id='morning meal' value='morning meal' onChange={handleDish} /><label htmlFor='morning meal'>Morning Meal</label>
                <input type='checkbox' id='brunch' value='brunch' onChange={handleDish} /><label htmlFor='brunch'>Brunch</label>
                <input type='checkbox' id='breakfast' value='breakfast' onChange={handleDish} /><label htmlFor='breakfast'>Breakfast</label>
                <input type='checkbox' id='main dish' value='main dish' onChange={handleDish} /><label htmlFor='main dish'>Main Dish</label>
            </div>
            <hr/>
            <div>
                {allTypes?.map((type, index) => <label key={type} htmlFor={type}><input type='checkbox' id={type} value={index} onChange={handleDiets} />{type}</label>)}
            </div>
            <button type="submit" onClick={handleAddStep}>Add Recipe</button>
        </form>
    </div>
}