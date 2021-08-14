import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing(){
    return <div className='landingContainer'>
        {/* <img src="https://fondosmil.com/fondo/56609.jpg" alt='Not Found'/> */}
        {/* <img src="https://www.cocinavital.mx/wp-content/uploads/2017/02/test-de-comida.jpg" alt='Not Found'/> */}
        {/* <img src="https://es.himgs.com/imagenes/estar-bien/20180626126011/descubre-si-es-mas-saludable-la-comida-fria-o-caliente-cs/0-578-410/comidafriaocaliente-t.jpg" alt='Not Found'/> */}
        {/* <img src="https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg" alt='Not Found'/> */}
        {/* <img src="https://p4.wallpaperbetter.com/wallpaper/899/593/118/cuisine-food-india-indian-wallpaper-preview.jpg" alt='Not Found'/> */}
        {/* <img src="https://www.infobae.com/new-resizer/IrUgFg3ERDopM6jxTJoRdarEUzI=/992x558/filters:format(jpg):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/02101555/comida-saludable.jpg" alt='Not Found'/>*/}
        {/* <img src="https://img.freepik.com/vector-gratis/conjunto-dibujos-animados-mostrador-cocina-electrodomesticos-nevera-horno-microondas-hervidor-agua-licuadora_1441-1819.jpg?size=626&ext=jpg" alt='Not Found'/> */}
        {/* <img src="https://i.pinimg.com/736x/bf/69/08/bf690857ed4d86ebd952684b2d214176.jpg" alt='Not Found'/> */}
        <img src="https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-acogedora-cocina-moderna-mesa-electrodomesticos_1441-1835.jpg?size=626&ext=jpg" alt='Not Found'/>
        {/* <h3 className='landingH3'>Welcome to my kitchen</h3> */}
        <Link to='/home/recipes'>
            <button className='landingButton'>Let's Cook</button>
        </Link>
    </div>
}