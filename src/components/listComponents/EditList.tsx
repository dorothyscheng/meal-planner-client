import { useState, useEffect } from 'react';
import List from '../../models/List.interface';
import { RecipeLong } from '../../models/Recipe.interface';

interface Style {
    display: 'none' | 'flex',
}

interface Props {
    display: boolean,
    hideEditList: () => void,
    list: List | null,
    handleUpdateList: (list: List) => void,
}

const EditList = (props: Props): JSX.Element => {
    const [name, setName] = useState('');
    const [recipes, setRecipes] = useState<RecipeLong[] | []>([]);
    const [_id, setId] = useState('');
    const [username, setUsername] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    }

    const handleClose = (): void => {
        if (props.list) {
            setName(props.list.name);
            props.hideEditList();
        }
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        props.handleUpdateList({
            name: name,
            recipes: recipes,
            _id: _id,
            username: username,
        });
        props.hideEditList();
    }

    useEffect(() => {
        if (props.list && props.list._id) {
            setName(props.list.name);
            setRecipes(props.list.recipes);
            setId(props.list._id);
            setUsername(props.list.username);
        }
    }, [props.list])

    let style: Style = {
        display: 'none',
    }
    if (props.display) {
        style = {
            display: 'flex',
        }
    };
    return (
        <form className="list-edit-form" style={style}>
            <label htmlFor="username">New List Name:</label>
                <input 
                    name="username" 
                    type="text"
                    value={name}
                    onChange={handleNameChange} />
                <div className="actions">
                    <p className="btn cancel-btn" onClick={handleClose}>Close</p>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
        </form>
    )

}

export default EditList;