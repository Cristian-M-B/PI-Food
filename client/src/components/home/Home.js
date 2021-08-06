import axios from 'axios';
import Recipes from '../recipes/Recipes.js';

export default function Home () {

    // async function getTypes(){
    //     try {
    //         let json = await axios('http://localhost:3001/api/types');
    //         let data = json.data;
    //         return data;
    //     } catch (error){
    //         console.log(error);
    //     }
    // }
    // var types = getTypes();
    var array = ['All','Vegetarian','Vegan']
    return <div>
        <div>
        <select>
            <option value='asc'>Asc</option>
            <option value='desc'>Desc</option>
        </select>
        <select>
            <option value='higher'>Higher Score</option>
            <option value='lower'>Lower Score</option>
        </select>
        <select>
            {/* <option value='higher'>{types.map(type => type)}</option> */}
            {/* {types?.map(type => <option key={type}value={type}>{type}</option>)} */}
            {array?.map(type => <option value={type}>{type}</option>)}
        </select>
        </div>
        <Recipes />
    </div>
}