import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar.js';
import './NavBar.css'

export default function NavBar() {
    return <div className='divNav'>
        <div className="navHome">
            <Link to='/home/recipes'>
                <button>Home</button>
            </Link>
        </div>
        <div className="navCreate">
            <Link to='/home/create'>
                <button>Create Recipe</button>
            </Link>
        </div>
        <div className="navSearchBar">
            <SearchBar />
        </div>
    </div>
}