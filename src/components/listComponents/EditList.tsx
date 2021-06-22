import React from 'react';

interface Style {
    display: 'none' | 'flex',
}

interface Props {
    display: boolean,
    hideEditList: (e: React.MouseEvent) => void,
    name: string,
}

interface State {
    name: string,
}

class EditList extends React.Component<Props, State> {
    state: State = {
        name: '',
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: e.target.value,
        })
    }

    handleClose = (e: React.MouseEvent): void => {
        this.setState({
            name: this.props.name,
        });
        this.props.hideEditList(e);
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
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
                        <button className="submit-btn">Submit</button>
                    </div>
            </form>
        )
    }
}

export default EditList;