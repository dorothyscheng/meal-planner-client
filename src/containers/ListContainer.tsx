import { useState } from 'react';

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

    const handleListClick = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const listId = e.target.value;
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
        listTitles = props.lists.map(list => <option className="list-label" key={list._id} value={list._id}>{list.name}</option>)
    }
    return (
        <section className="dash-section lists">
            <div className="list-titles">
                {props.lists ? <><label htmlFor="list">Select a list to view: </label><select name="list" onChange={handleListClick}>{ listTitles }</select></> : <h3>Loading...</h3>}
            </div>
            { selectedList && <ListShow 
                list={selectedList} 
                handleUpdateList={props.handleUpdateList}
                handleDeleteList={props.handleDeleteList} /> }
        </section>
    );
}

export default ListContainer;