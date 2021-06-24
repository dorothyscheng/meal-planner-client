import React, { useState } from 'react';
import Week from '../models/Week.interface';
import WeekShow from '../components/weekComponents/WeekShow';
import { useEffect } from 'react';

interface Props {
    weeks: Week[] | null,
}

const WeekContainer = (props: Props): JSX.Element => {
    const [selectedWeek, setSelectedWeek] = useState<Week | null>(props.weeks ? props.weeks[0] : null);

    const handleWeekClick = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const weekId = e.target.value;
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
                <option className="list-label" key={week._id} value={week._id}>{week.name}</option>
            );
        });
    }
    
    let weekShow = <WeekShow week={selectedWeek} />

    useEffect(() => {
        setSelectedWeek(props.weeks ? props.weeks[0] : null)
    },[props.weeks])

    return (
        <section className="dash-section">
            <div className="week-titles">
                {props.weeks ? <><label htmlFor="week">Select a week to view: </label><select name="week" onChange={handleWeekClick}>{ weekTitles }</select></> : <h3>Loading...</h3>}
            </div>
            {/* <WeekShow week={selectedWeek} /> */}
            { weekShow }
        </section>
    );
}

export default WeekContainer;