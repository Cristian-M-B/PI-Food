import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing(){
    return <div className="container">
        <Link to='/home'>
            <button>Let's Cook</button>
        </Link>
    </div>
}