import { RecipeLong } from '../../models/Recipe.interface';
import List from '../../models/List.interface';
import React from 'react';

interface Style {
    display: 'none' | 'block',
}

interface Props {
    display: boolean,
    recipe: RecipeLong | null,
    hideListListModal: () => void,
    lists: List[] | null,
    handleUpdateList: (list: List) => void,
}

const ListListModal = (props: Props): JSX.Element => {
    let style: Style = {
        display: 'none',
    }
    if (props.display) {
        style = {
            display: 'block',
        }
    };

    const handleClose = (e: React.MouseEvent): void => {
        const target = e.target as Element;
        if (target.className === 'modal-container' || target.className === 'btn cancel-btn') {
            props.hideListListModal();
        };
    }

    const handleSelect = (e: React.MouseEvent): void => {
        if (props.lists && props.recipe) {
            const target = e.target as Element;
            const listId = target.getAttribute('id');
            const selectedList = props.lists.find(list => list._id === listId);
            if (selectedList) {
                selectedList.recipes.push(props.recipe)
                props.handleUpdateList(selectedList);
            };
        };
    }

    let listTitles;
    if (props.lists) {
        props.lists.sort((a,b) => {
            if (a.createdAt && b.createdAt) {
               return Date.parse(a.createdAt) - Date.parse(b.createdAt)
            } else {
                return 0;
            }
        });
        listTitles = props.lists.map(list => {
            return (
                <h3 className="list-label" key={list._id} id={list._id} onClick={handleSelect}>{list.name} ({list.recipes.length} recipes)</h3>
            )
        })
    }

    const protectedContent = (
        <>
            <h2>Select a list for {props.recipe ? props.recipe.recipe.label : ''}</h2>
            { listTitles }
        </>
    )
    const otherContent = (
        <h2>Login to your account to add recipes to your lists</h2>
    )
    return (
        <div className="modal-container" style={style} onClick={handleClose}>
            <div className="modal-content">
                { props.lists ? protectedContent : otherContent }
                <div className="actions">
                <p className="btn cancel-btn">Close</p>
            </div>
            </div>
        </div>
    );
}

export default ListListModal;