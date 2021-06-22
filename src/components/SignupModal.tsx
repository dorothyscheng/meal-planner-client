import React from 'react';

import User from '../models/User.interface';

interface Props {
    display: boolean,
    showSignup: () => void,
    hideSignup: () => void,
    handleSignup: (user: User) => void,
    error: string | null,
}

interface State {
    username: string,
    password: string,
    passwordConfirm: string,
    email: string,
    familySize: string,
    error: string | null,
}

interface Style {
    display: 'none' | 'block',
}

class SignupModal extends React.Component<Props, State> {
    state: State = {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        familySize: '',
        error: null,
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

    handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const event = e.nativeEvent as InputEvent;
        const letter = event.data;
        let password = '';
        if (letter) {
            password = this.state.passwordConfirm + letter;
        } else {
            password = this.state.passwordConfirm.slice(0,this.state.passwordConfirm.length-1)
        };
        this.setState({
            passwordConfirm: password,
        });
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            email: e.target.value,
        });
    }

    handleFamilySizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            familySize: e.target.value,
        });
    }

    handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as Element;
        if (target.className === 'modal-container' || target.className === 'btn cancel-btn') {
            this.setState({
                username: '',
                password: '',
                passwordConfirm: '',
                email: '',
                familySize: '',
                error: null,
            });
            this.props.hideSignup();
        };
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (this.state.username === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                error: 'Username, email, and password are required'
            });
        } else if (this.state.password === this.state.passwordConfirm) {
            const newUser = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                familySize: Number(this.state.familySize)
            }
            this.props.handleSignup(newUser);
            this.setState({
                username: '',
                password: '',
                passwordConfirm: '',
                email: '',
                familySize: '',
                error: null,
            });
        } else {
            this.setState({
                error: 'Passwords must match',
            })
        };
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
        const passwordConfirmDisplay = this.state.passwordConfirm.split('').map(char => '*').join('');
        return (
            <div className="modal-container" style={style} onClick={this.handleClose}>
                <div className="modal-content">
                    <form className="form">
                        <h1>Welcome to Meal Planner!</h1>
                        { this.props.error && <h3>{this.props.error}</h3>}
                        { this.state.error && <h3>{this.state.error}</h3>}
                        <label htmlFor="username">Username:</label>
                        <input 
                            name="username" 
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange} />

                        <label htmlFor="password">Password:</label>
                        <input 
                            name="password" 
                            type="text"
                            value={passwordDisplay}
                            onChange={this.handlePasswordChange} />

                        <label htmlFor="passwordConfirm">Confirm Password:</label>
                        <input 
                            name="passwordConfirm" 
                            type="text"
                            value={passwordConfirmDisplay}
                            onChange={this.handlePasswordConfirmChange} />

                        <label htmlFor="email">Email:</label>
                        <input 
                            name="email" 
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange} />

                        <label htmlFor="familySize">How many are you cooking for?</label>
                        <input 
                            className="last-input"
                            name="familySize" 
                            type="number"
                            value={this.state.familySize}
                            onChange={this.handleFamilySizeChange} />

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

export default SignupModal;