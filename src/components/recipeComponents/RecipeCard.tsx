import { RecipeLong } from '../../models/Recipe.interface';

interface Props {
    recipe: RecipeLong
}

const RecipeCard = (props: Props): JSX.Element => {
    return (
        <div className="recipe-card">{props.recipe.recipe.label}</div>
    );
};

export default RecipeCard;