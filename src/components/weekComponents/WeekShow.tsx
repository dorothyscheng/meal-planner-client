import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Week from '../../models/Week.interface';
import RecipeCard from '../recipeComponents/RecipeCard';

interface Props {
    week: Week | null,
    handleDeleteWeek: (week: Week) => void,
}

const WeekShow = (props: Props): JSX.Element => {
    const [weekName, setWeekName] = useState<any>(props.week?.name);

    useEffect(() => {
        setWeekName(props.week?.name);
    }, [props.week]);

    if (!props.week) return <div className="week-show-container"><h3>Create a week, then add recipes from your lists.</h3></div>;

    const handleDeleteClick = () => {
        if (props.week) {
            props.handleDeleteWeek(props.week);
        }
    }

    const editDeleteButtons = (
        <>
            <Link className="btn cancel-btn" to={`/dashboard/${props.week._id}/edit`}>Edit</Link>
            <p className="btn delete-btn" onClick={handleDeleteClick}>Delete</p>
        </>
    );

    return (
        <div className="week-show-container">
            <div className="week-show-title">
                <h2>{weekName}</h2>
                <div className="actions">
                    { editDeleteButtons }
                </div>
            </div>
            <table className="week-show-table">
                <tbody>
                    <tr>
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                    <tr>
                        <td className="meal-title">B</td>
                        <td id="mondayB"> { props.week.mondayB && props.week.mondayB._links ? <RecipeCard recipe={props.week.mondayB} /> : '' } </td>
                        <td id="tuesdayB"> { props.week.tuesdayB && props.week.tuesdayB._links ? <RecipeCard recipe={props.week.tuesdayB} /> : '' } </td>
                        <td id="wednesdayB"> { props.week.wednesdayB && props.week.wednesdayB._links ? <RecipeCard recipe={props.week.wednesdayB} /> : '' } </td>
                        <td id="thursdayB"> { props.week.thursdayB && props.week.thursdayB._links ? <RecipeCard recipe={props.week.thursdayB} /> : '' } </td>
                        <td id="fridayB"> { props.week.fridayB && props.week.fridayB._links ? <RecipeCard recipe={props.week.fridayB} /> : '' } </td>
                        <td id="saturdayB"> { props.week.saturdayB && props.week.saturdayB._links ? <RecipeCard recipe={props.week.saturdayB} /> : '' } </td>
                        <td id="sundayB"> { props.week.sundayB && props.week.sundayB._links ? <RecipeCard recipe={props.week.sundayB} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">L</td>
                        <td id="mondayL"> { props.week.mondayL && props.week.mondayL._links ? <RecipeCard recipe={props.week.mondayL} /> : '' } </td>
                        <td id="tuesdayL"> { props.week.tuesdayL && props.week.tuesdayL._links ? <RecipeCard recipe={props.week.tuesdayL} /> : '' } </td>
                        <td id="wednesdayL"> { props.week.wednesdayL && props.week.wednesdayL._links ? <RecipeCard recipe={props.week.wednesdayL} /> : '' } </td>
                        <td id="thursdayL"> { props.week.thursdayL && props.week.thursdayL._links ? <RecipeCard recipe={props.week.thursdayL} /> : '' } </td>
                        <td id="fridayL"> { props.week.fridayL && props.week.fridayL._links ? <RecipeCard recipe={props.week.fridayL} /> : '' } </td>
                        <td id="saturdayL"> { props.week.saturdayL && props.week.saturdayL._links ? <RecipeCard recipe={props.week.saturdayL} /> : '' } </td>
                        <td id="sundayL"> { props.week.sundayL && props.week.sundayL._links ? <RecipeCard recipe={props.week.sundayL} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">D</td>
                        <td id="mondayD"> { props.week.mondayD && props.week.mondayD._links ? <RecipeCard recipe={props.week.mondayD} /> : '' } </td>
                        <td id="tuesdayD"> { props.week.tuesdayD && props.week.tuesdayD._links ? <RecipeCard recipe={props.week.tuesdayD} /> : '' } </td>
                        <td id="wednesdayD"> { props.week.wednesdayD && props.week.wednesdayD._links ? <RecipeCard recipe={props.week.wednesdayD} /> : '' } </td>
                        <td id="thursdayD"> { props.week.thursdayD && props.week.thursdayD._links ? <RecipeCard recipe={props.week.thursdayD} /> : '' } </td>
                        <td id="fridayD"> { props.week.fridayD && props.week.fridayD._links ? <RecipeCard recipe={props.week.fridayD} /> : '' } </td>
                        <td id="saturdayD"> { props.week.saturdayD && props.week.saturdayD._links ? <RecipeCard recipe={props.week.saturdayD} /> : '' } </td>
                        <td id="sundayD"> { props.week.sundayD && props.week.sundayD._links ? <RecipeCard recipe={props.week.sundayD} /> : '' } </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeekShow;