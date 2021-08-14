import './Paged.css';

export default function Paged ({recipesPerPage, allRecipes, paged}){
    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i);
    }

    return <div>
            {pageNumbers.map(number => (
                    <button className='pagedButton' key={number} onClick={() => paged(number)}>{number}</button>
            ))}
    </div>
}