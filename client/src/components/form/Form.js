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
    const [errorsDish, setErrorsDish] = useState("");
    const [dish, setDish] = useState("");
    const [input, setInput] = useState({
        name: "",
        score: 0,
        healthScore: 0,
        image: "",
        summary: "",
        steps: [],
        dishTypes: [],
        diets: []
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
                errors.healthScore = 'Health Score is invalid'
            } else if(input.healthScore < 0 || input.healthScore > 100){
                errors.healthScore = 'Maximum up to 100'
            }
        }

        if(input.image){
            if(!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\w .-]*)*\/?$/.test(input.image)){
                errors.image = 'URL is invalid'
            }
        }

        if(!input.summary){
            errors.summary = 'Summary is required';
        } else if(!/^[a-zA-Z0-9 ñ,.;:/()'%-]+$/u.test(input.summary)){
            errors.summary = 'Summary is invalid';
        } else if(input.summary.length < 20){
            errors.summary = 'Minimum 20 letters';
        }

        return errors;
    }

    function validateStep(step){
        let error = '';
        if(step){
            if(!/^[a-zA-Z0-9 ñ,.;:/()'%-]+$/u.test(step)){
                error = 'Step is invalid';
            } else if(step.length < 10){
                error = 'Minimum 10 letters';
            }
        }
        return error;
    }

    function validateDish(dish){
        let error = '';
        if(dish){
            if(!/^[a-zA-Zñ]+$/u.test(dish)){
                error = 'Dish Type is invalid';
            } else if(dish.length < 4){
                error = 'Minimum 4 letters';
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

    function handleDish(e){
        setErrorsDish(validateDish(e.target.value))
        setDish(e.target.value)
    }

    function handleAddDish(){
        setInput({
            ...input,
            dishTypes: [...input.dishTypes, dish]
        })
        setDish("");
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
            dishTypes: [],
            diets: []
        })
        alert("Recipe Successfully Created")
    }

    return <form onSubmit={handleOnSubmit}>
        <div className='formContainer'>
            <div className='formInputs'>
                <h3 className='formTitle'>Create a new Recipe</h3>
                <label htmlFor='name'>Name</label>
                <input className={errors.name && 'errors'} type='text' id='name' name='name'
                    value={input.name} onChange={handleOnChange} />
                {errors.name && <p className='errors'>{errors.name}</p>}

                <label htmlFor='score'>Score</label>
                <input className={errors.score && 'errors'} type='text' id='score' name='score'
                    value={input.score} onChange={handleOnChange} />
                {errors.score && <p className='errors'>{errors.score}</p>}

                <label htmlFor='healthScore'>Health Score</label>
                <input className={errors.healthScore && 'errors'} type='text' id='healthScore' name='healthScore'
                    value={input.healthScore} onChange={handleOnChange} />
                {errors.healthScore && <p className='errors'>{errors.healthScore}</p>}

                <label htmlFor='image'>Image (URL)</label>
                <input className={errors.image && 'errors'} type='url' id='image' name='image'
                    value={input.image} onChange={handleOnChange} />
                {errors.image && <p className='errors'>{errors.image}</p>}

                <label htmlFor='dish'>Dish Types</label>
                <input className={errorsDish && 'errors'} type='text' id='dish' name='dish'
                    value={dish} onChange={handleDish} />
                {dish && !errorsDish && <a className ='formA' onClick={handleAddDish}> Add dish</a>}
                {errorsDish && <p className='errors'>{errorsDish}</p>}

                <label htmlFor='step'>Steps</label>
                <input className={errorsStep && 'errors'} type='text' id='step' name='step'
                    value={step} onChange={handleStep} />
                {step && !errorsStep && <a className ='formA' onClick={handleAddStep}> Add step</a>}
                {errorsStep && <p className='errors'>{errorsStep}</p>}

                <p className='formP'>Diets Types</p>
                <div className='formDiets'>
                    {allTypes?.map((type, index) => <label key={type} htmlFor={type}><input type='checkbox' id={type} value={index} onChange={handleDiets} />{type}</label>)}
                </div>
                <label htmlFor='summary'>Summary</label>
                <textarea className={errors.summary && 'errors'} type='text' id='summary' name='summary' rows='10' cols='50'
                    value={input.summary} onChange={handleOnChange} />
                {errors.summary && <p className='errors'>{errors.summary}</p>}

                {!errors.name && !errors.summary && input.name && input.summary &&
                <button type="submit">Add Recipe</button>}
            </div>
        </div>
    </form>
}