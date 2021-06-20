import { Link } from 'react-router-dom';
import CSS from 'csstype';

import { RecipeLong } from '../../models/Recipe.interface';

interface Props {
    recipe: RecipeLong
}

const RecipeCard = (props: Props): JSX.Element => {
    const style: CSS.Properties = {
        backgroundImage: `url(${props.recipe.recipe.image})`,
    }
    const recipeId = props.recipe._links.self.href;
    // v2(.*)? need to figure out regex for recipe id
    return (
        <Link className="recipe-card-link" to="/">
            <div className="card recipe-card" style={style}>
                <h3 className="recipe-title">{props.recipe.recipe.label}</h3>
            </div>
        </Link>
    );
};

export default RecipeCard;