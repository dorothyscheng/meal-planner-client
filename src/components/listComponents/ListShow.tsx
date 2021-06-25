import React from 'react';

import List from '../../models/List.interface';
import RecipeCard from '../recipeComponents/RecipeCard';
import EditList from './EditList';
import { RecipeLong } from '../../models/Recipe.interface';

interface Props {
    list: List,
    handleUpdateList: (list: List) => void,
    handleDeleteList: (list: List) => void,
}

interface State {
    showEditList: boolean,
}

class ListShow extends React.Component<Props, State> {
    state: State = {
        showEditList: false,
    }

    showEditList = (): void => {
        this.setState({
            showEditList: true,
        });
    }

    hideEditList = (): void => {
        this.setState({
            showEditList: false,
        })
    }

    handleDelete = (): void => {
        const listToDelete = {
            name: this.props.list.name,
            recipes: this.props.list.recipes,
            _id: this.props.list._id,
            username: this.props.list.username,
        };
        this.props.handleDeleteList(listToDelete);
    }

    removeRecipeFromList = (recipeToRemove: RecipeLong): void => {
        let recipes = this.props.list.recipes.filter(recipe => recipe._links.self.href !== recipeToRemove._links.self.href);
        const listToUpdate = {
            name: this.props.list.name,
            recipes: recipes,
            _id: this.props.list._id,
            username: this.props.list.username,
        };
        this.props.handleUpdateList(listToUpdate);
    }

    render(): JSX.Element {
        const recipeCards = this.props.list.recipes.map((recipe, index) => <RecipeCard 
            key={`${recipe._links.self.href}-${index}`} 
            recipe={recipe}
            removeRecipeFromList={this.removeRecipeFromList} />)
        return (
            <div className="list-show">
                <div className="list-show-title">
                    <div className="list-show-title-name">
                        <h3>{this.props.list.name}</h3>
                        <EditList 
                            display={this.state.showEditList} 
                            hideEditList={this.hideEditList} 
                            list={this.props.list}
                            handleUpdateList={this.props.handleUpdateList} />
                    </div>
                    <div className="actions">
                        <p className="btn cancel-btn" onClick={this.showEditList}>Edit</p>
                        <p className="btn delete-btn" onClick={this.handleDelete}>Delete</p>
                    </div>
                </div>
                <div className="list-show-recipes">
                    { recipeCards.length !== 0 && recipeCards }
                </div>
            </div>
        );
    }
}

export default ListShow;