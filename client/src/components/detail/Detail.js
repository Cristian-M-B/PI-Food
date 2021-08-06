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
                {detail.image ? <img src={detail.image} alt="image not found" />
                    : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9slf6wR4ob-ePI4hoLlwd3y4krnGhgFMBg&usqp=CAU" alt="image not found" />
                }
                <div>
                    <h4>Score</h4>
                    <p>{detail.score}</p>
                </div>
                <div>
                    <h4>HealthScore</h4>
                    <p>{detail.healthScore}</p>
                </div>
                {detail.diets.length ?
                    <div>
                        <h4>Diets</h4>
                        {detail.diets.map(diet => <p>{diet}</p>)}
                    </div>
                    : null
                }
                {detail.dishTypes ?
                    <div>
                        <h4>DishTypes</h4>
                        {detail.dishTypes.map(dish => <p>{dish}</p>)}
                    </div>
                    : null
                }
                <div>
                    <h4>Summary</h4>
                    <p>{detail.summary}</p>
                </div>
                {detail.steps ?
                    <div>
                        <h4>Steps</h4>
                        {detail.steps.map(step => <p>{step}</p>)}
                    </div>
                    : null
                }
            </div>
            : <h1>Cargando ...</h1>
        }
    </div>
}