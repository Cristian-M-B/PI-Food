export default function Recipe ({recipe}){
    return <div className="recipeCard">
        <p>{recipe.name}</p>
        {/* <img src={"recipe.image"} alt="image not found"/> */}
        <p>{recipe.diets}</p>
        <p>{recipe.dishTypes}</p>
    </div>
}