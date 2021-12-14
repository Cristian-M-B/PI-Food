import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar.js';
import styled from './NavBar.module.css';

export default function NavBar() {
    return <div className={styled.container}>
            <Link to='/home/recipes'>
                <button className={styled.btn}>Home</button>
            </Link>
            <SearchBar />
            <Link to='/home/create'>
                <button className={styled.btn}>New</button>
            </Link>
    </div>
}