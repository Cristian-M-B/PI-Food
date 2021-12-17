import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRecipesName } from '../../redux/actions/index.js';
import { HiSearch } from 'react-icons/hi';
import styled from './SearchBar.module.css';

export default function SearchBar() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    function handleOnChange(e) {
        setInput(e.target.value);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesName(input))
        setInput('');
        history.push('/home/recipes');
    }

    return <form className={styled.container} onSubmit={handleOnSubmit}>
        <input className={styled.input} type="text" placeholder="Search ..." value={input} onChange={handleOnChange} />
        <button type='submit'>
            <HiSearch />
        </button>
    </form>
}