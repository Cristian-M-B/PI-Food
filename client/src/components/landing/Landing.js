import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing(){
    return <div className='landingContainer'>
        {/* <img src="https://fondosmil.com/fondo/56609.jpg" alt='Not Found'/> */}
        {/* <img src="https://www.cocinavital.mx/wp-content/uploads/2017/02/test-de-comida.jpg" alt='Not Found'/> */}
        {/* <img src="https://es.himgs.com/imagenes/estar-bien/20180626126011/descubre-si-es-mas-saludable-la-comida-fria-o-caliente-cs/0-578-410/comidafriaocaliente-t.jpg" alt='Not Found'/> */}
        {/* <img src="https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg" alt='Not Found'/> */}
        <img src="https://p4.wallpaperbetter.com/wallpaper/899/593/118/cuisine-food-india-indian-wallpaper-preview.jpg" alt='Not Found'/>
        <h3 className='landingH3'>Welcome to my kitchen</h3>
        <Link to='/home/recipes'>
            <button className='landingButton'>Let's Cook</button>
        </Link>
    </div>
}

