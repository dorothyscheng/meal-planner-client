import React, { useState } from 'react';
import Week from '../models/Week.interface';
import WeekShow from '../components/weekComponents/WeekShow';
import { useEffect } from 'react';

interface Props {
    weeks: Week[] | null,
    handleDeleteWeek: (week: Week) => void,
}

const WeekContainer = (props: Props): JSX.Element => {
    const [selectedWeek, setSelectedWeek] = useState<Week | null>(props.weeks ? props.weeks[0] : null);

    useEffect(() => {
        setSelectedWeek(props.weeks ? props.weeks[0] : null)
    },[props.weeks])

    const handleWeekClick = (e: React.MouseEvent): void => {
        const target = e.target as Element;
        const weekId = target.getAttribute('id');
        if (props.weeks) {
            setSelectedWeek(props.weeks.filter(week => week._id === weekId)[0]);
        }
    };

    let weekTitles;
    if (props.weeks) {
        props.weeks.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return Date.parse(a.createdAt) - Date.parse(b.createdAt)
            } else {
                return 0;
            }
        });
        weekTitles = props.weeks.map(week => {
            return (
                <h3 className="list-label" key={week._id} id={week._id} onClick={handleWeekClick}>{week.name}</h3>
            );
        });
    }
    
    let weekShow = <WeekShow week={selectedWeek} handleDeleteWeek={props.handleDeleteWeek} />

    return (
        <section className="dash-section">
            <div className="list-titles week-titles">
                {props.weeks ? weekTitles : <h3>Loading...</h3>}
            </div>
            { weekShow }
        </section>
    );
}

export default WeekContainer;