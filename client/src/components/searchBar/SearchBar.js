import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {getRecipesName} from '../../redux/actions/index.js';

export default function SearchBar(){
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    function handleOnChange(e){
        setInput(e.target.value);
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getRecipesName(input))
        setInput('');
    }

    return <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="Search Recipe" value={input} onChange={handleOnChange} />
        <button type='submit'>Search</button>
    </form>
}