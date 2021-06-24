import React from 'react';
import { RouteComponentProps } from 'react-router';

import User from '../../models/User.interface';
import Week from '../../models/Week.interface';
import List from '../../models/List.interface';
import EditWeekListShow from './EditWeek.ListShow';
import WeekShow from './WeekShow';

interface Params {
    weekId: string,
}

interface Props extends RouteComponentProps<Params> {
    user: User | null,
}

interface State {
    week: Week | null,
    selectedList: List | null,
}

class EditWeek extends React.Component<Props, State> {
    state: State = {
        week: null,
        selectedList: null,
    }

    handleListSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const listId = e.target.value;
        if (this.props.user && this.props.user.lists) {
            const selectedList = this.props.user.lists.filter(list => list._id === listId)[0];
            this.setState({
                selectedList: selectedList,
            });
        }
    }

    componentDidMount() {
        const weekId = this.props.match.params.weekId;
        if (this.props.user && this.props.user.weeks) {
            const selectedWeek = this.props.user.weeks.filter(week => week._id === weekId)[0];
            if (this.props.user.lists) {
                this.setState({
                    week: selectedWeek,
                    selectedList: this.props.user.lists[0],
                });
            };
        };
    }

    render(): JSX.Element {
        if (!this.state.week) return <h3>We can't access this week. Please return to your dashboard and navigate to this week edit page using the appropriate link.</h3>;
        if (!this.props.user) return <h3>Login or create an account to continue.</h3>;
        let lists: JSX.Element | JSX.Element[] = <h3>Create a list with recipes in order to make your week.</h3>;
        if (this.props.user.lists) {
            this.props.user.lists.sort((a,b) => {
                if (a.createdAt && b.createdAt) {
                    return Date.parse(a.createdAt) - Date.parse(b.createdAt)
                 } else {
                     return 0;
                 }
            });
            lists = this.props.user.lists.map(list => <option key={list._id} value={list._id}>{list.name}</option>)
        }


        return (
            <div className="week-edit-container">
                <div className="week-edit-list-container">
                    <h2>Editing: {this.state.week.name}</h2>
                    <div className="list-holder">
                        <label htmlFor="list-name">Select a list:</label>
                        <select name="list-name" id="list-name" className="list-names" onChange={this.handleListSelect}>
                            { lists }
                        </select>
                        <EditWeekListShow list={this.state.selectedList} />
                    </div>
                </div>
                <WeekShow week={this.state.week} />
            </div>
        );
    }
}

export default EditWeek;