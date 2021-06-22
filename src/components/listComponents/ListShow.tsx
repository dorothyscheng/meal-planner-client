import React from 'react';

import List from '../../models/List.interface';
// import RecipeCard from '../recipeComponents/RecipeCard';
import EditList from './EditList';

interface Props {
    list: List,
    handleUpdateList: (list: List) => void,
    handleDeleteList: (list: List) => void,
    username: string,
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
            username: this.props.username,
        };
        this.props.handleDeleteList(listToDelete);
    }

    render(): JSX.Element {
        // const recipeCards = this.props.list.recipes.map(recipe => <RecipeCard recipe={recipe} />)
        return (
            <div className="list-show">
                <div className="list-show-title">
                    <h3>{this.props.list.name}</h3>
                    <EditList 
                        display={this.state.showEditList} 
                        hideEditList={this.hideEditList} 
                        list={this.props.list}
                        handleUpdateList={this.props.handleUpdateList} />
                </div>
                <div className="list-show-recipes">
                    {/* { recipeCards.length === 0 && recipeCards } */}
                </div>
                <div className="actions">
                    <p className="btn cancel-btn" onClick={this.showEditList}>Edit</p>
                    <p className="btn delete-btn" onClick={this.handleDelete}>Delete</p>
                </div>
            </div>
        );
    }
}

export default ListShow;