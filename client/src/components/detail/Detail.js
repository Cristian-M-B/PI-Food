import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import { removeDetail } from "../../redux/actions";
import styled from './Detail.module.css';

export default function Detail () {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(removeDetail())
        }
    }, [dispatch, id]);

    const detail = useSelector(state => state.detail);

    return <div className={styled.detailContainer}>
        {detail.name ?
            <div className={styled.detailImage}>
                <div><h2 className={styled.detailH2}>{detail.name}</h2></div>
                {detail.image ? <img src={detail.image} alt="Not Found" />
                    : <img src="https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg" alt="Not Found" />
                }
                <div className={styled.detailScore}>
                    <h4 className={styled.detailH4}>Score</h4>
                    <p className={styled.detailP}>{detail.score? detail.score : 0}</p>
                </div>
                <div className={styled.detailHealthScore}>
                    <h4 className={styled.detailH4}>Health Score</h4>
                    <p className={styled.detailP}>{detail.healthScore? detail.healthScore : 0}</p>
                </div>
                {Array.isArray(detail.diets) && detail.diets[0] &&
                    <div>
                        <h4 className={styled.detailH4}>Diets Types</h4>
                        {detail.diets.map(diet => <p className={styled.detailP} key={diet}>{diet}</p>)}
                    </div>
                }
                {Array.isArray(detail.dishTypes) && detail.dishTypes[0] &&
                    <div>
                        <h4 className={styled.detailH4}>Dish Types</h4>
                        {detail.dishTypes.map(dish => <p className={styled.detailP} key={dish}>{dish}</p>)}
                    </div>
                }
                <div>
                    <h4 className={styled.detailH4}>Summary</h4>
                    <p className={styled.detailP}>{detail.summary.replace(/<[^>]*>/g,'')}</p>
                </div>
                {Array.isArray(detail.steps) && detail.steps[0] &&
                    <div>
                        <h4 className={styled.detailH4}>Steps</h4>
                        {detail.steps.map(step => <p className={styled.detailP} key={step}>{step}</p>)}
                    </div>
                }
            </div>
            : <div className='containerSpinner'><span className={styled.spinner}></span></div>
        }   
    </div>
}