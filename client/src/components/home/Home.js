import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes, getTypes, sortRecipesByName, sortRecipesByScore, filterRecipesByType } from '../../redux/actions/index.js';
import Recipes from '../recipes/Recipes.js';
import Paged from '../paged/Paged.js';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes)
    const allTypes = useSelector(state => state.types)

    const [order, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 5;
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
        setCurrentPage(1);
    }
    
    function handleSortAlphabetically(e){
        dispatch(sortRecipesByName(e.target.value));
        setOrder(`Order ${e.target.value}`);
        setCurrentPage(1);
    }

    function handleSortScore(e){
        dispatch(sortRecipesByScore(e.target.value));
        setOrder(`Order ${e.target.value}`);
        setCurrentPage(1);
    }

    function handleFilter(e){
        dispatch(filterRecipesByType(e.target.value))
        setOrder(`Filter ${e.target.value}`);
        setCurrentPage(1);
    }

    return <div>
        <div>
            <button onClick={handleOnClick}>Reload Recipes</button>
        </div>
        {Array.isArray(currentRecipes) && 
        <div>
        <select defaultValue='Sort by name' onChange={handleSortAlphabetically}>
            <option disabled>Sort by name</option>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
        </select>
        <select defaultValue='Sort by score' onChange={handleSortScore}>
            <option disabled>Sort by score</option>
            <option value='Lower'>Lower</option>
            <option value='higher'>Higher</option>
        </select>
        <select defaultValue='Filter by type' onChange={handleFilter}>
            <option disabled>Filter by type</option>
            {allTypes?.map((type, index) => <option key={index} value={type}>{type}</option>)}
        </select>
        <Paged recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paged={paged}/>
        </div>}
        <Recipes currentRecipes={currentRecipes}/>
    </div>
}