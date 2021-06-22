import React from 'react';

import { UserLogin } from '../models/User.interface';

interface Props {
    display: boolean,
    showLogin: () => void,
    hideLogin: () => void,
    handleLogin: (user: UserLogin) => void,
    error: string | null,
}

interface State {
    username: string,
    password: string,
}

interface Style {
    display: 'none' | 'block',
}

class LoginModal extends React.Component<Props, State> {
    state: State = {
        username: '',
        password: '',
    }

    handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const event = e.nativeEvent as InputEvent;
        const letter = event.data;
        let password = '';
        if (letter) {
            password = this.state.password + letter;
        } else {
            password = this.state.password.slice(0,this.state.password.length-1)
        };
        this.setState({
            password: password,
        });
    }

    handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as Element;
        if (target.className === 'modal-container' || target.className === 'btn cancel-btn') {
            this.setState({
                username: '',
                password: '',
            });
            this.props.hideLogin();
        };
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
        this.setState({
            username: '',
            password: '',
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
        const passwordDisplay = this.state.password.split('').map(char => '*').join('');
        return (
            <div className="modal-container" style={style} onClick={this.handleClose}>
                <div className="modal-content">
                    <form className="form">
                        <h1>Hi again!</h1>
                        { this.props.error && <h3>Authentication failed</h3>}
                        <label htmlFor="username">Username:</label>
                        <input 
                            name="username" 
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange} />
                        <label htmlFor="password">Password:</label>
                        <input 
                            className="last-input"
                            name="password" 
                            type="text"
                            value={passwordDisplay}
                            onChange={this.handlePasswordChange} />
                        <div className="actions">
                            <p className="btn cancel-btn">Close</p>
                            <button 
                                className="submit-btn" 
                                type="submit"
                                onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginModal;