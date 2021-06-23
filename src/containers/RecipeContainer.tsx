import React from 'react';
import { RouteComponentProps } from 'react-router';

import { RecipeLong } from '../models/Recipe.interface';
import RecipeCard from '../components/recipeComponents/RecipeCard';
import RecipeModel from '../models/RecipeModel';
import ListListModal from '../components/listComponents/ListListModal';
import List from '../models/List.interface';

interface Props extends RouteComponentProps {
    lists: List[] | null,
    handleUpdateList: (list: List) => void,
}

interface State {
    recipes: RecipeLong[],
    next: string,
    from: number,
    to: number,
    total: number,
    showListListModal: boolean,
    selectedRecipe: RecipeLong | null,
}

class RecipeContainer extends React.Component<Props, State> {
    state: State = {
        recipes: [],
        next: '',
        from: 0,
        to: 0,
        total: 0,
        showListListModal: false,
        selectedRecipe: null,
    }

    fetchRecipeQuery = (query: string): void => {
        RecipeModel.querySearch(query)
            .then(response => {
                this.setState({
                    recipes: response.hits,
                    next: response._links.next.href,
                    from: response.from,
                    to: response.to,
                    total: response.count,
                });
            });
    }

    fetchRecipeNext = (url: string): void => {
        RecipeModel.next(url)
            .then(response => {
                this.setState({
                    recipes: response.hits,
                    next: response._links.next.href,
                    from: response.from,
                    to: response.to,
                    total: response.count,
                });
            });
    }

    showListListModal = (recipe: RecipeLong) => {
        this.setState({
            showListListModal: true,
            selectedRecipe: recipe,
        });
    }

    hideListListModal = () => {
        this.setState({
            showListListModal: false,
        })
    }

    componentDidMount() {
        const query = this.props.location.search.slice(1);
        if (query) {
            this.fetchRecipeQuery(query);
        }
    }

    render(): JSX.Element {
        if (this.state.recipes.length === 0) return <h1>Search for a recipe</h1>
        const recipeCards = this.state.recipes.map(recipe => <RecipeCard 
            key={recipe.recipe.uri} 
            recipe={recipe} 
            showListListModal={this.showListListModal} />)
        return (
            <div>
                <h1>Showing recipes {this.state.from} to {this.state.to} of {this.state.total}</h1>
                <p onClick={() => this.fetchRecipeNext(this.state.next)}>Next page</p>
                <div className="card-container recipe-container">
                    { recipeCards }
                </div>
                <ListListModal 
                    display={this.state.showListListModal} 
                    hideListListModal={this.hideListListModal}
                    recipe={this.state.selectedRecipe}
                    lists={this.props.lists}
                    handleUpdateList={this.props.handleUpdateList} />
            </div>
        );
    }
};

export default RecipeContainer;