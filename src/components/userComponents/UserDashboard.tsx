import User from '../../models/User.interface';

interface Props {
    user: User | null,
}

const UserDashboard = (props: Props): JSX.Element => {
    if (!props.user) return <h1>Loading...</h1>
    return (
        <div>
            {props.user.username}
        </div>
    );
}

export default UserDashboard;