import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDbRecipes } from '../../redux/actions/index.js';
import SearchBar from '../searchBar/SearchBar.js';
import styled from './NavBar.module.css';

export default function NavBar() {
    const dispatch = useDispatch();

    function handleOnClick(e){
        dispatch(getDbRecipes());
    }

    return <div className={styled.container}>
            <Link to='/home/recipes'>
                <button className={styled.btn} onClick={handleOnClick} >Home</button>
            </Link>
            <SearchBar />
            <Link to='/home/create'>
                <button className={styled.btn}>New</button>
            </Link>
    </div>
}