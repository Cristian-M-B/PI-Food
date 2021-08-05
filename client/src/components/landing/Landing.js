import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing(){
    return <div>
        {/* <img src="https://fondosmil.com/fondo/56609.jpg"/> */}
        <Link to='/home/recipes'>
            <button>Let's Cook</button>
        </Link>
    </div>
}