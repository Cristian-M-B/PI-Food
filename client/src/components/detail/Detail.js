import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import { removeDetail } from "../../redux/actions";

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

    return <div className="detailCard">
        {detail.name ?
            <div>
                <div><h2>{detail.name}</h2></div>
                {detail.image ? <img src={detail.image} alt="Not Found" />
                    : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9slf6wR4ob-ePI4hoLlwd3y4krnGhgFMBg&usqp=CAU" alt="Not Found" />
                }
                <div>
                    <h4>Score</h4>
                    <p>{detail.score}</p>
                </div>
                <div>
                    <h4>HealthScore</h4>
                    <p>{detail.healthScore}</p>
                </div>
                {Array.isArray(detail.diets) && detail.diets[0] &&
                    <div>
                        <h4>Diets</h4>
                        {detail.diets.map(diet => <p key={diet}>{diet}</p>)}
                    </div>
                }
                {Array.isArray(detail.dishTypes) && detail.dishTypes[0] &&
                    <div>
                        <h4>DishTypes</h4>
                        {detail.dishTypes.map(dish => <p key={dish}>{dish}</p>)}
                    </div>
                }
                <div>
                    <h4>Summary</h4>
                    <p>{detail.summary.replace(/<[^>]*>/g,'')}</p>
                </div>
                {Array.isArray(detail.steps) && detail.steps[0] &&
                    <div>
                        <h4>Steps</h4>
                        {detail.steps.map(step => <p key={step}>{step}</p>)}
                    </div>
                }
            </div>
            : <h1>LOADING ...</h1>
        }   
    </div>
}