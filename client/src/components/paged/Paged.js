export default function Paged ({recipesPerPage, allRecipes, paged}){
    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i);
    }

    return <div>
        <ul>
            {pageNumbers.map(number => (
                <li key={number}>
                    <button onClick={() => paged(number)}>{number}</button>
                </li>
            ))}
        </ul>
    </div>
}