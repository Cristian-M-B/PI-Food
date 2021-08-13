import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing(){
    return <div className='landingContainer'>
        {/* <img src="https://fondosmil.com/fondo/56609.jpg" alt='Not Found'/> */}
        {/* <img src="https://www.cocinavital.mx/wp-content/uploads/2017/02/test-de-comida.jpg" alt='Not Found'/> */}
        <img src="https://es.himgs.com/imagenes/estar-bien/20180626126011/descubre-si-es-mas-saludable-la-comida-fria-o-caliente-cs/0-578-410/comidafriaocaliente-t.jpg" alt='Not Found'/>
        <Link to='/home/recipes'>
            <button className='landingButton'>Let's Cook</button>
        </Link>
    </div>
}