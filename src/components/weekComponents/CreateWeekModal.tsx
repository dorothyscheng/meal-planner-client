import React from 'react';

import Week from '../../models/Week.interface';

interface Style {
    display: 'none' | 'block',
}

interface Props {
    display: boolean,
    hideCreateWeekModal: () => void,
    handleCreateWeek: (week: Week) => void,
    username: string,
}

interface State {
    name: string,
}

class CreateWeekModal extends React.Component<Props, State> {
    state: State = {
        name: '',
    }

    handleClose = (e: React.MouseEvent) => {
        const target = e.target as Element;
        if (target.className === 'modal-container' || target.className === 'btn cancel-btn') {
            this.props.hideCreateWeekModal();
        };
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: e.target.value,
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const newWeek = {
            username: this.props.username,
            name: this.state.name,
        }
        this.props.handleCreateWeek(newWeek);
        this.props.hideCreateWeekModal();
        const now = new Date();
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let month: string|number = now.getMonth();
        month = months[month];
        const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        let day: string|number = now.getDay();
        day = days[day];
        const date = now.getDate();
        const year = now.getFullYear();
        this.setState({
            name: `${day}, ${month} ${date}, ${year}`,
        });
    }

    componentDidMount() {
        const now = new Date();
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let month: string|number = now.getMonth();
        month = months[month];
        const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        let day: string|number = now.getDay();
        day = days[day];
        const date = now.getDate();
        const year = now.getFullYear();
        this.setState({
            name: `${day}, ${month} ${date}, ${year}`,
        });
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
                        <label htmlFor="username">What do you want to call your week?</label>
                        <input 
                            className="last-input"
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

export default CreateWeekModal;