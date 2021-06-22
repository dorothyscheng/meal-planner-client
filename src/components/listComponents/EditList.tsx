import React from 'react';
import List from '../../models/List.interface';

interface Style {
    display: 'none' | 'flex',
}

interface Props {
    display: boolean,
    hideEditList: () => void,
    list: List,
    handleUpdateList: (list: List) => void,
}

interface State {
    name: List['name'],
    recipes: List['recipes'],
    _id: List['_id'],
    username: List['username'];
}

class EditList extends React.Component<Props, State> {
    state: State = {
        name: '',
        recipes: [],
        _id: '',
        username: '',
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: e.target.value,
        })
    }

    handleClose = (): void => {
        this.setState({
            name: this.props.list.name,
        });
        this.props.hideEditList();
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        this.props.handleUpdateList(this.state);
        this.props.hideEditList();
    }

    componentDidMount() {
        this.setState({
            name: this.props.list.name,
            recipes: this.props.list.recipes,
            _id: this.props.list._id,
            username: this.props.list.username,
        })
    }

    render(): JSX.Element {
        let style: Style = {
            display: 'none',
        }
        if (this.props.display) {
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
                        value={this.state.name}
                        onChange={this.handleNameChange} />
                    <div className="actions">
                        <p className="btn cancel-btn" onClick={this.handleClose}>Close</p>
                        <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
                    </div>
            </form>
        )
    }
}

export default EditList;