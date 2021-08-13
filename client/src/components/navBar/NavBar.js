import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar.js';
import './NavBar.css';

export default function NavBar() {
    return <div className='navContainer'>
        <div>
            <Link to='/home/recipes'>
                <button>Home</button>
            </Link>
            <Link to='/home/create'>
                <button>Create Recipe</button>
            </Link>
        </div>
            <SearchBar />
    </div>
}