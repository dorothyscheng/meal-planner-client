import List from '../../models/List.interface';
import RecipeCard from '../recipeComponents/RecipeCard';

interface Props {
    list: List | null,
}

const EditWeekListShow = (props: Props): JSX.Element => {
    if (!props.list) return <h3>Loading...</h3>;
    let recipes: JSX.Element | JSX.Element[] = <h3>No recipes found</h3>;
    if (props.list.recipes.length > 0) {
        recipes = props.list.recipes.map(recipe => <RecipeCard key={recipe._links.self.href} recipe={recipe} />)
    }
    return (
        <div className="recipe-holder">
            { recipes }
        </div>
    );
}

export default EditWeekListShow