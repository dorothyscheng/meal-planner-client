import React from 'react';

import User from '../../models/User.interface';

interface Style {
    display: 'none' | 'block',
}

interface Props {
    display: boolean,
    handleDelete: () => void,
    hideDeleteModal: () => void,
}

class UserDeleteModal extends React.Component<Props, {}> {
    handleClose = (e: React.MouseEvent) => {
        const target = e.target as Element;
        console.log(target.className);
        if (target.className === 'modal-container' || target.className === 'btn cancel-btn') {
            this.props.hideDeleteModal();
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
        return (
            <div className="modal-container" style={style} onClick={this.handleClose}>
                <div className="modal-content">
                    <h3>Are you sure you want to delete your account?</h3>
                    <div className="actions">
                            <p className="btn cancel-btn">Close</p>
                            <p 
                                className="btn delete-btn" 
                                onClick={this.props.handleDelete}
                                >Delete</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDeleteModal;