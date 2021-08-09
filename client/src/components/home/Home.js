import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes, getTypes, sortRecipesByName, sortRecipesByScore } from '../../redux/actions/index.js';
import Recipes from '../recipes/Recipes.js';
import Paged from '../paged/Paged.js';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes)
    const allTypes = useSelector(state => state.types)
    const [order, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(5);
    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getTypes())
    }, [dispatch])

    function paged (numberPage){
        setCurrentPage(numberPage);
    }

    function handleOnClick(e){
        dispatch(getRecipes());
    }
    
    function handleSortAlphabetically(e){
        dispatch(sortRecipesByName(e.target.value));
        setOrder(`Order ${e.target.value}`)
    }

    function handleSortScore(e){
        dispatch(sortRecipesByScore(e.target.value));
        setOrder(`Order ${e.target.value}`)
    }

    return <div>
        <div>
            <button onClick={handleOnClick}>Reload Recipes</button>
        </div>
        <div>
        <select onChange={handleSortAlphabetically}>
            <option selected disabled>Sort by name</option>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
        </select>
        <select onChange={handleSortScore}>
            <option selected disabled>Sort by score</option>
            <option value='lower'>Lower</option>
            <option value='higher'>Higher</option>
        </select>
        <select>
            <option selected disabled>Filter by type</option>
            {/* {allTypes?.map(type => <option value={type}>{type}</option>)} */}
        </select>
        </div>
        <Paged recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paged={paged}/>
        <Recipes currentRecipes={currentRecipes}/>
    </div>
}