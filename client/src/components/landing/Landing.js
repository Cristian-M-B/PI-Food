import {Link} from 'react-router-dom'
import styled from './Landing.module.css';

export default function Landing(){
    return <div className={styled.landingContainer}>
        {/* <img src="https://img.freepik.com/vector-gratis/interior-cocina-muebles-madera-dibujos-animados_107791-298.jpg?size=626&ext=jpg" alt='Not Found'/> */}
        <Link to='/home/recipes'>
            <button className={styled.landingButton}>Let's Cook</button>
        </Link>
    </div>
}