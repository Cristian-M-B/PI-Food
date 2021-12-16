import { Link } from 'react-router-dom'
import styled from './Landing.module.css';

export default function Landing() {
    return (
        <div className={styled.landingContainer}>
            <Link to='/home/recipes'>
                <button className={styled.landingButton}>Let's Cook</button>
            </Link>
        </div>
    )
}
