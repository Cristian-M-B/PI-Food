import styled from './Paged.module.css';

export default function Paged ({recipesPerPage, allRecipes, paged, currentPage}){
    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i);
    }

    return <div>
            {pageNumbers.map(number => (
                    <button className={number === currentPage? styled.currentPaged : styled.btn} key={number} onClick={() => paged(number)}>{number}</button>
            ))}
    </div>
}