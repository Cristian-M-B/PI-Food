import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDbRecipes, postRecipe } from "../../redux/actions";
import styled from './Form.module.css';

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
        healthScore: "",
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
        <div className={styled.formContainer}>
            <div className={styled.formInputs}>
                <h3 className={styled.formTitle}>Write your recipe</h3>
                <label htmlFor='name'>Name</label>
                <input className={errors.name? styled.errors : styled.input} type='text' id='name' name='name'
                    value={input.name} onChange={handleOnChange} />
                {errors.name && <p className={styled.errors}>{errors.name}</p>}

                <label htmlFor='healthScore'>Health Score</label>
                <input className={errors.healthScore? styled.errors : styled.input} type='text' id='healthScore' name='healthScore'
                    value={input.healthScore} onChange={handleOnChange} />
                {errors.healthScore && <p className={styled.errors}>{errors.healthScore}</p>}

                <label htmlFor='image'>Image (URL)</label>
                <input className={errors.image? styled.errors : styled.input} type='url' id='image' name='image'
                    value={input.image} onChange={handleOnChange} />
                {errors.image && <p className={styled.errors}>{errors.image}</p>}

                <label htmlFor='dish'>Dish Types</label>
                <input className={errorsDish? styled.errors : styled.input} type='text' id='dish' name='dish'
                    value={dish} onChange={handleDish} />
                {dish && !errorsDish && <button className={styled.formA} onClick={handleAddDish}> Add dish</button>}
                {errorsDish && <p className={styled.errors}>{errorsDish}</p>}

                <label htmlFor='step'>Steps</label>
                <input className={errorsStep? styled.errors : styled.input} type='text' id='step' name='step'
                    value={step} onChange={handleStep} />
                {step && !errorsStep && <button className={styled.formA} onClick={handleAddStep}> Add step</button>}
                {errorsStep && <p className={styled.errors}>{errorsStep}</p>}

                <p className={styled.formP}>Diets Types</p>
                <div className={styled.formDiets}>
                    {allTypes?.map((type, index) => <label key={type} htmlFor={type}><input type='checkbox' id={type} value={index} onChange={handleDiets} />{type}</label>)}
                </div>
                <label htmlFor='summary'>Summary</label>
                <textarea className={errors.summary && styled.errors} type='text' id='summary' name='summary' rows='10' cols='50'
                    value={input.summary} onChange={handleOnChange} />
                {errors.summary && <p className={styled.errors}>{errors.summary}</p>}

                {!errors.name && !errors.summary && input.name && input.summary &&
                <button className={styled.btn} type="submit">Save</button>}
            </div>
        </div>
    </form>
}