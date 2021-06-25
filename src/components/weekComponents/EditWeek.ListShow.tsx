import React from 'react';
import { Link } from 'react-router-dom';

import List from '../../models/List.interface';
import RecipeCard from '../recipeComponents/RecipeCard';
import { RecipeLong } from '../../models/Recipe.interface';

interface Props {
    list: List | null,
    handleRecipeSelect: (e: React.MouseEvent) => void,
    selectedRecipe: RecipeLong | null,
}

const EditWeekListShow = (props: Props): JSX.Element => {
    if (!props.list) return <h3>Loading...</h3>;
    let recipes: JSX.Element | JSX.Element[] = <Link to="/recipes" className="underline"><h4>Add recipes to a list, then add them to your week.</h4></Link>;
    if (props.list.recipes.length > 0) {
        recipes = props.list.recipes.map((recipe, index) => {
            let selected = false;
            if (props.selectedRecipe && props.selectedRecipe.recipe.label === recipe.recipe.label) {
                selected = true;
            }
            return (
                <RecipeCard 
                    key={`${recipe._links.self.href}-${index}`} 
                    recipe={recipe} 
                    handleRecipeSelect={props.handleRecipeSelect}
                    selected={selected} />
            );
            });
    };
    return (
        <div className="recipe-holder">
            { recipes }
        </div>
    );
}

export default EditWeekListShow