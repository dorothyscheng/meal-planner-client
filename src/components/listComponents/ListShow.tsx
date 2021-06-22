import React from 'react';

import List from '../../models/List.interface';
import RecipeCard from '../recipeComponents/RecipeCard';
import EditList from './EditList';

interface Props {
    list: List,
    handleUpdateList: (list: List) => void,
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

    render(): JSX.Element {
        const recipeCards = this.props.list.recipes.map(recipe => <RecipeCard recipe={recipe} />)
        // const noRecipes = (
        //     <>
        //         <Link className="underline" to="/recipes"><p>Search for recipes to add</p></Link>
        //     </>
        // )
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
                    { recipeCards.length === 0 && recipeCards }
                </div>
                <div className="actions">
                    <p className="btn cancel-btn" onClick={this.showEditList}>Edit</p>
                    <p className="btn delete-btn">Delete</p>
                </div>
            </div>
        );
    }
}

// const ListShow = (props: Props): JSX.Element => {
//     const recipeCards = props.list.recipes.map(recipe => <RecipeCard recipe={recipe} />)
//     const noRecipes = (
//         <>
//             <Link className="underline" to="/recipes"><p>Search for recipes to add</p></Link>
//         </>
//     )
//     return (
//         <div className="list-show">
//             <h2>{props.list.name}</h2>
//             <div className="list-show-recipes">
//                 { recipeCards.length === 0 ? noRecipes : recipeCards }
//             </div>
//             <div className="actions">
//                 <p className="btn cancel-btn">Edit</p>
//                 <p className="btn delete-btn">Delete</p>
//             </div>
//         </div>
//     );
// }

export default ListShow;