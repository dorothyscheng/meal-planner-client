import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import CSS from 'csstype';

import { RecipeLong } from '../../models/Recipe.interface';

interface Props {
    recipe: RecipeLong,
    showListListModal?: (recipe: RecipeLong) => void,
    removeRecipeFromList?: (recipe: RecipeLong) => void,
}

const RecipeCard = (props: Props): JSX.Element => {
    const [redirect, setRedirect] = useState(false);

    const redirectLink = (e: React.MouseEvent): void => {
        const target = e.target as Element;
        if (target.className === 'card recipe-card' || target.className === 'recipe-title') {
            setRedirect(true);
        };
    };

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
    if (redirect) return <Redirect to={`/recipes/${recipeId}`} />
    return (
        <div className="recipe-card-link" onClick={redirectLink}>
            <div className="card recipe-card" style={style}>
                <h3 className="recipe-title">{props.recipe.recipe.label}</h3>
                { props.removeRecipeFromList && <i className="fas fa-trash-alt" onClick={() => {if (props.removeRecipeFromList) {props.removeRecipeFromList(props.recipe)}}}></i> }
                { props.showListListModal && <i className="fas fa-plus-circle" onClick={() => {if (props.showListListModal) {props.showListListModal(props.recipe)}}}></i> }
            </div>
        </div>
    );
};

export default RecipeCard;