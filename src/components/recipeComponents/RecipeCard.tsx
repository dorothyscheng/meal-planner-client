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
    const regexp = /v2\/(.*)\?/
    const recipeIdArr = props.recipe._links.self.href.match(regexp);
    let recipeId = '';
    if (!recipeIdArr) {
        recipeId = 'NOT FOUND';
    } else {
        recipeId = recipeIdArr[1];
    };
    return (
        <Link className="recipe-card-link" to={`/recipes/${recipeId}`}>
            <div className="card recipe-card" style={style}>
                <h3 className="recipe-title">{props.recipe.recipe.label}</h3>
            </div>
        </Link>
    );
};

export default RecipeCard;