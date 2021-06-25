import { useState, useEffect } from 'react';

import List from '../models/List.interface';
import ListShow from '../components/listComponents/ListShow';

interface Props {
    lists: List[] | null,
    handleUpdateList: (list: List) => void,
    handleDeleteList: (list: List) => void,
    username: string,
}

const ListContainer = (props: Props): JSX.Element => {
    const [selectedList, setSelectedList] = useState(props.lists ? props.lists[0] : null);

    const handleListClick = (e: React.MouseEvent): void => {
        const target = e.target as Element;
        const listId = target.getAttribute('id');
        if (props.lists) {
            setSelectedList(props.lists.filter(list => list._id === listId)[0]);
        }
    }

    let listTitles;
    if (props.lists && props.lists.length > 0) {
        props.lists.sort((a,b) => {
            if (a.createdAt && b.createdAt) {
               return Date.parse(a.createdAt) - Date.parse(b.createdAt)
            } else {
                return 0;
            }
        });
        listTitles = props.lists.map(list => <h3 
            className="list-label" 
            key={list._id}
            id={list._id}
            onClick={handleListClick}>{list.name}</h3>)
    }

    useEffect(() => {
        setSelectedList(props.lists ? props.lists[0] : null)
    },[props.lists])

    return (
        <section className="dash-section">
            <div className="list-titles">
                {props.lists ? listTitles : <h3>Loading...</h3>}
            </div>
            { selectedList && <ListShow 
                list={ selectedList } 
                handleUpdateList={props.handleUpdateList}
                handleDeleteList={props.handleDeleteList} /> }
        </section>
    );
}

export default ListContainer;