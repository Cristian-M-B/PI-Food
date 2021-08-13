import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDbRecipes, postRecipe } from "../../redux/actions";
import './Form.css';

export default function Form () {
    const dispatch = useDispatch();
    const allTypes = useSelector(state => state.types);
    const [errors, setErrors] = useState({});
    const [errorsStep, setErrorsStep] = useState("");
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

    function validateInputs (input){
        let errors = {};

        if(!input.name){
            errors.name = 'Name is required';
        } else if(!/^[a-zA-Z ,.'-]+$/u.test(input.name)){
            errors.name = 'Name is invalid';
        } else if(input.name.length < 3) {
            errors.name = 'Minimum 3 letters'
        }

        if(input.score){
            if(!/^[0-9]+$/.test(input.score)){
                errors.score = 'Score is invalid'
            } else if(input.score < 0 || input.score > 100){
                errors.score = 'Maximum up to 100'
            }
        }

        if(input.healthScore){
            if(!/^[0-9]+$/.test(input.healthScore)){
                errors.healthScore = 'HealthScore is invalid'
            } else if(input.healthScore < 0 || input.healthScore > 100){
                errors.healthScore = 'Maximum up to 100'
            }
        }

        if(input.image){
            if(!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(input.image)){
                errors.image = 'URL is invalid'
            }
        }

        if(!input.summary){
            errors.summary = 'Summary is required';
        } else if(!/^[a-zA-Z0-9 ,.;:/()'%-]+$/u.test(input.summary)){
            errors.summary = 'Summary is invalid';
        } else if(input.summary.length < 20){
            errors.summary = 'Minimum 20 letters'
        }

        return errors;
    }

    function validateStep(step){
        let error = '';
        if(step){
            if(!/^[a-zA-Z0-9 ,.;:/()'%-]+$/u.test(step)){
                error = 'Step is invalid';
            }
        }
        return error;
    }

    function handleOnChange(e){
        setErrors(
            validateInputs({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleStep(e){
        setErrorsStep(validateStep(e.target.value))
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
        dispatch(getDbRecipes());
        setInput({
            name: "",
            score: "",
            healthScore: "",
            image: "",
            summary: "",
            steps: [],
            diets: [],
            dishTypes: []
        })
        alert("Recipe Successfully Created")
    }

    return <form onSubmit={handleOnSubmit}>
        <div className='formContainer'>
            <div className='formName'>
                <label htmlFor='name'>*Name: </label>
                <input type='text' id='name' name='name'
                    value={input.name} onChange={handleOnChange} />
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div className='formScore'>
                <label htmlFor='score'>Score: </label>
                <input type='text' id='score' name='score'
                    value={input.score} onChange={handleOnChange} />
                {errors.score && <p>{errors.score}</p>}
            </div>
            <div className='formHealthScore'>
                <label htmlFor='healthScore'>HealthScore: </label>
                <input type='text' id='healthScore' name='healthScore'
                    value={input.healthScore} onChange={handleOnChange} />
                {errors.healthScore && <p>{errors.healthScore}</p>}
            </div>
            <div className='formImage'>
                <label htmlFor='image'>Image (URL): </label>
                <input type='url' id='image' name='image'
                    value={input.image} onChange={handleOnChange} />
                {errors.image && <p>{errors.image}</p>}
            </div>
            <div className='formSteps'>
                <label htmlFor='step'>Steps: </label>
                <input type='text' id='step' name='step'
                    value={step} onChange={handleStep} />
                <a className ='formA' onClick={handleAddStep}> Add Step</a>
                {errorsStep && <p>{errorsStep}</p>}
            </div>
            <div className='formSummary'>
                <label htmlFor='summary'>*Summary: </label>
                <textarea type='text' id='summary' name='summary' rows='10' cols='50'
                    value={input.summary} onChange={handleOnChange} />
                {errors.summary && <p>{errors.summary}</p>}
            </div>
            <div className='formDishTypes'>
                <p>DishTypes</p>
                <label htmlFor='side dish'><input type='checkbox' id='side dish' value='side dish' onChange={handleDish} />Side Dish</label>
                <label htmlFor='lunch'><input type='checkbox' id='lunch' value='lunch' onChange={handleDish} />Lunch</label>
                <label htmlFor='dinner'><input type='checkbox' id='dinner' value='dinner' onChange={handleDish} />Dinner</label>
                <label htmlFor='morning meal'><input type='checkbox' id='morning meal' value='morning meal' onChange={handleDish} />Morning Meal</label>
                <label htmlFor='brunch'><input type='checkbox' id='brunch' value='brunch' onChange={handleDish} />Brunch</label>
                <label htmlFor='breakfast'><input type='checkbox' id='breakfast' value='breakfast' onChange={handleDish} />Breakfast</label>
                <label htmlFor='main dish'><input type='checkbox' id='main dish' value='main dish' onChange={handleDish} />Main Dish</label>
            </div>
            <div className='formDiets'>
                <p>Diets</p>
                {allTypes?.map((type, index) => <label key={type} htmlFor={type}><input type='checkbox' id={type} value={index} onChange={handleDiets} />{type}</label>)}
            </div>
            {!errors.name && !errors.summary && input.name && input.summary &&
                <button type="submit" onClick={handleAddStep}>Add Recipe</button>}
        </div>
    </form>
}