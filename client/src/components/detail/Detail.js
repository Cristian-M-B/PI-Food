import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import { removeDetail } from "../../redux/actions";
import './Detail.css';

export default function Detail () {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(removeDetail())
        }
    }, [dispatch]);

    const detail = useSelector(state => state.detail);

    return <div className="detailContainer">
        {detail.name ?
            <div className='detailImage'>
                <div><h2 className='detailH2'>{detail.name}</h2></div>
                {detail.image ? <img src={detail.image} alt="Not Found" />
                    : <img src="https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg" alt="Not Found" />
                }
                <div className='detailScore'>
                    <h4 className='detailH4'>Score</h4>
                    <p className='detailP'>{detail.score}</p>
                </div>
                <div className='detailHealthScore'>
                    <h4 className='detailH4'>HealthScore</h4>
                    <p className='detailP'>{detail.healthScore}</p>
                </div>
                {Array.isArray(detail.diets) && detail.diets[0] &&
                    <div>
                        <h4 className='detailH4'>Diets</h4>
                        {detail.diets.map(diet => <p className='detailP' key={diet}>{diet}</p>)}
                    </div>
                }
                {Array.isArray(detail.dishTypes) && detail.dishTypes[0] &&
                    <div>
                        <h4 className='detailH4'>DishTypes</h4>
                        {detail.dishTypes.map(dish => <p className='detailP' key={dish}>{dish}</p>)}
                    </div>
                }
                <div>
                    <h4 className='detailH4'>Summary</h4>
                    <p className='detailP'>{detail.summary.replace(/<[^>]*>/g,'')}</p>
                </div>
                {Array.isArray(detail.steps) && detail.steps[0] &&
                    <div>
                        <h4 className='detailH4'>Steps</h4>
                        {detail.steps.map(step => <p className='detailP' key={step}>{step}</p>)}
                    </div>
                }
            </div>
            : <h1>LOADING ...</h1>
        }   
    </div>
}