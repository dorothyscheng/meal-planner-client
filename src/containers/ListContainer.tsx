import List from '../models/List.interface';
import ListShow from '../components/listComponents/ListShow';

interface Props {
    lists: List[] | null;
}

const ListContainer = (props: Props): JSX.Element => {
    let listShow;
    if (props.lists && props.lists.length > 0) {
        listShow = props.lists.map(list => <ListShow key={list._id} list={list} />)
    }
    return (
        <section className="dash-section lists">
            { props.lists ? listShow : <h3>Loading...</h3>}
        </section>
    );
}

export default ListContainer;