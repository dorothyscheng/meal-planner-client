import React from 'react';

import { ListWithUser } from '../../models/List.interface';

interface Style {
    display: 'none' | 'block',
}

interface Props {
    display: boolean,
    hideCreateListModal: () => void,
    handleCreateList: (listWithUser: ListWithUser) => void,
    username: string,
}

interface State {
    name: string,
}

class CreateListModal extends React.Component<Props, State> {
    state: State = {
        name: '',
    }

    handleClose = (e: React.MouseEvent) => {
        const target = e.target as Element;
        if (target.className === 'modal-container' || target.className === 'btn cancel-btn') {
            this.props.hideCreateListModal();
        };
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: e.target.value,
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const newList = {
            username: this.props.username,
            name: this.state.name,
        }
        this.props.handleCreateList(newList);
        this.props.hideCreateListModal();
    }

    render(): JSX.Element {
        let style: Style = {
            display: 'none',
        }
        if (this.props.display) {
            style = {
                display: 'block',
            }
        };
        return (
            <div className="modal-container" style={style} onClick={this.handleClose}>
                <div className="modal-content">
                    <form className="form">
                        <label htmlFor="username">What do you want to call your list?</label>
                            <input 
                                name="username" 
                                type="text"
                                value={this.state.name}
                                onChange={this.handleNameChange} />
                            <div className="actions">
                                <p className="btn cancel-btn">Close</p>
                                <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateListModal;