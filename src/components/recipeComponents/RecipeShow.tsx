import React from 'react';
import { RouteComponentProps } from 'react-router';

import { RecipeLong } from '../../models/Recipe.interface';
import RecipeModel from '../../models/RecipeModel';
import ListListModal from '../listComponents/ListListModal';
import List from '../../models/List.interface';

interface State {
    recipe: RecipeLong | null;
    showListListModal: boolean,
}

interface recipeParams {
    id: string,
}

interface Props extends RouteComponentProps<recipeParams> {
    lists: List[] | null,
    handleUpdateList: (list: List) => void,
}

class RecipeShow extends React.Component<Props, State> {
    state: State = {
        recipe: null,
        showListListModal: false,
    }

    fetchRecipeData = (id: string): void => {
        RecipeModel.show(id)
            .then(response => {
                this.setState({
                    recipe: response,
                })
            });
    }

    showListListModal = () => {
        this.setState({
            showListListModal: true,
        })
    }

    hideListListModal = () => {
        this.setState({
            showListListModal: false,
        })
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
        const ingredientList = this.state.recipe.recipe.ingredientLines?.map((ingredient, idx) => <li key={idx} ><i className="fas fa-utensil-spoon"></i>{ingredient}</li>);
        const dietLabels = this.state.recipe.recipe.dietLabels?.map((label, idx) => <div key={idx} className="label">{label}</div>);
        const healthLabels = this.state.recipe.recipe.healthLabels?.map((label, idx) => <div key={idx} className="label">{label}</div>);
        return (
            <div className="recipe-show-container">
                <img className="recipe-show-img" src={this.state.recipe.recipe.image} alt={this.state.recipe.recipe.label} />
                <div className="recipe-show-content">
                    <h1>{this.state.recipe.recipe.label}</h1>
                    <div className="labels-container">
                        { dietLabels }
                        { healthLabels }
                    </div>
                    <div className="actions">
                        <p className="btn submit-btn" onClick={this.showListListModal}>Add to list</p>
                    </div>
                    <ul className="ingredient-list">
                        <li><strong>Ingredients</strong></li>
                        {ingredientList}
                    See full recipe and instructions on <a className="underline" href={this.state.recipe.recipe.url} target="_blank" rel="noopener noreferrer">{this.state.recipe.recipe.source}</a>
                    </ul>
                </div>
                { this.state.recipe && 
                <ListListModal
                    display={this.state.showListListModal}
                    recipe={this.state.recipe}
                    hideListListModal={this.hideListListModal}
                    lists={this.props.lists}
                    handleUpdateList={this.props.handleUpdateList} />
                }
            </div>
        );
    }
}

export default RecipeShow;