import { Link } from 'react-router-dom';

import List from '../../models/List.interface';
import RecipeCard from '../recipeComponents/RecipeCard';

interface Props {
    list: List;
}

const ListShow = (props: Props): JSX.Element => {
    const recipeCards = props.list.recipes.map(recipe => <RecipeCard recipe={recipe} />)
    const noRecipes = (
        <>
            <Link className="underline" to="/recipes"><p>Search for recipes to add</p></Link>
        </>
    )
    return (
        <div className="list-show">
            <h2>{props.list.name}</h2>
            <div className="list-show-recipes">
                { recipeCards.length === 0 ? noRecipes : recipeCards }
            </div>
        </div>
    );
}

export default ListShow;