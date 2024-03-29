import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDbRecipes, sortRecipesByName, sortRecipesByScore, filterRecipesByType } from '../../redux/actions/index.js';
import Recipes from '../recipes/Recipes.js';
import Paged from '../paged/Paged.js';
import styled from './Home.module.css';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes)
    const allTypes = useSelector(state => state.types)

    // eslint-disable-next-line
    const [render, setRender] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 12;
    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    function paged (numberPage){
        setCurrentPage(numberPage);
    }

    function handleOnClick(e){
        dispatch(getDbRecipes());
        setCurrentPage(1);
    }
    
    function handleSortAlphabetically(e){
        dispatch(sortRecipesByName(e.target.value));
        setRender(`Order ${e.target.value}`);
        setCurrentPage(1);
    }

    function handleSortScore(e){
        dispatch(sortRecipesByScore(e.target.value));
        setRender(`Sort ${e.target.value}`);
        setCurrentPage(1);
    }

    function handleFilter(e){
        dispatch(filterRecipesByType(e.target.value))
        setRender(`Filter ${e.target.value}`);
        setCurrentPage(1);
    }

    return <div>
        {Array.isArray(currentRecipes) && currentRecipes.length > 0 &&
            <div className={styled.filters}>
                <select className={styled.select} defaultValue='Sort by name' onChange={handleSortAlphabetically}>
                    <option disabled>Sort by name</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select className={styled.select} defaultValue='Sort by score' onChange={handleSortScore}>
                    <option disabled>Sort by score</option>
                    <option value='lower'>Lower</option>
                    <option value='higher'>Higher</option>
                </select>
                <select className={styled.select} defaultValue='Filter by type' onChange={handleFilter}>
                    <option disabled>Filter by type</option>
                    {allTypes?.map((type, index) => <option key={index} value={type}>{type}</option>)}
                </select>
            </div>
        }
        {!Array.isArray(allRecipes) &&
            <button className={styled.select} onClick={handleOnClick}>Reload recipes</button>
        }
        <Recipes currentRecipes={currentRecipes} />
        {Array.isArray(currentRecipes) && currentRecipes.length > 0 &&
            <Paged recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paged={paged} currentPage={currentPage} />
        }
    </div>
}