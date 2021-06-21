import React from 'react';
import { RouteComponentProps } from 'react-router';

import { RecipeLong } from '../../models/Recipe.interface';
import RecipeModel from '../../models/RecipeModel';

interface State {
    recipe: RecipeLong['recipe'] | null;
}

interface recipeParams {
    id: string,
}

class RecipeShow extends React.Component<RouteComponentProps<recipeParams>, State> {
    state: State = {
        recipe: null,
    }

    fetchRecipeData = (id: string): void => {
        RecipeModel.show(id)
            .then(response => {
                this.setState({
                    recipe: response.recipe,
                })
            });
    }

    componentDidMount(): void {
        this.fetchRecipeData(this.props.match.params.id);
    }

    render(): JSX.Element {
        if (!this.state.recipe) {
            return (
                <div className="recipe-show-container">
                    <h1>Loading...</h1>
                </div>
            )
        }
        const ingredientList = this.state.recipe.ingredientLines?.map((ingredient, idx) => <li key={idx} ><i className="fas fa-utensil-spoon"></i>{ingredient}</li>);
        const dietLabels = this.state.recipe.dietLabels?.map((label, idx) => <div key={idx} className="label">{label}</div>);
        const healthLabels = this.state.recipe.healthLabels?.map((label, idx) => <div key={idx} className="label">{label}</div>);
        return (
            <div className="recipe-show-container">
                <img className="recipe-show-img" src={this.state.recipe.image} alt={this.state.recipe.label} />
                <div className="recipe-show-content">
                    <h1>{this.state.recipe.label}</h1>
                    <div className="labels-container">
                        { dietLabels }
                        { healthLabels }
                    </div>
                    <ul className="ingredient-list">
                        <li><strong>Ingredients</strong></li>
                        {ingredientList}
                    See full recipe and instructions on <a href={this.state.recipe.url}>{this.state.recipe.source}</a>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RecipeShow;