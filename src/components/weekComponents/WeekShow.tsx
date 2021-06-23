import { Link } from 'react-router-dom';

import Week from '../../models/Week.interface';
import RecipeCard from '../recipeComponents/RecipeCard';

interface Props {
    week: Week | null,
}

const WeekShow = (props: Props): JSX.Element => {
    if (!props.week) return <h3>Loading...</h3>;
    return (
        <div className="week-show-container">
            <div className="week-show-title">
                <h2>{props.week.name}</h2>
                <div className="actions">
                    <Link className="btn cancel-btn" to={`/dashboard/${props.week._id}/edit`}>Edit</Link>
                    <p className="btn delete-btn">Delete</p>
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
                        <td> { props.week.mondayB && props.week.mondayB._links ? <RecipeCard recipe={props.week.mondayB} /> : '' } </td>
                        <td> { props.week.tuesdayB && props.week.tuesdayB._links ? <RecipeCard recipe={props.week.tuesdayB} /> : '' } </td>
                        <td> { props.week.wednesdayB && props.week.wednesdayB._links ? <RecipeCard recipe={props.week.wednesdayB} /> : '' } </td>
                        <td> { props.week.thursdayB && props.week.thursdayB._links ? <RecipeCard recipe={props.week.thursdayB} /> : '' } </td>
                        <td> { props.week.fridayB && props.week.fridayB._links ? <RecipeCard recipe={props.week.fridayB} /> : '' } </td>
                        <td> { props.week.saturdayB && props.week.saturdayB._links ? <RecipeCard recipe={props.week.saturdayB} /> : '' } </td>
                        <td> { props.week.sundayB && props.week.sundayB._links ? <RecipeCard recipe={props.week.sundayB} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">L</td>
                        <td> { props.week.mondayL && props.week.mondayL._links ? <RecipeCard recipe={props.week.mondayL} /> : '' } </td>
                        <td> { props.week.tuesdayL && props.week.tuesdayL._links ? <RecipeCard recipe={props.week.tuesdayL} /> : '' } </td>
                        <td> { props.week.wednesdayL && props.week.wednesdayL._links ? <RecipeCard recipe={props.week.wednesdayL} /> : '' } </td>
                        <td> { props.week.thursdayL && props.week.thursdayL._links ? <RecipeCard recipe={props.week.thursdayL} /> : '' } </td>
                        <td> { props.week.fridayL && props.week.fridayL._links ? <RecipeCard recipe={props.week.fridayL} /> : '' } </td>
                        <td> { props.week.saturdayL && props.week.saturdayL._links ? <RecipeCard recipe={props.week.saturdayL} /> : '' } </td>
                        <td> { props.week.sundayL && props.week.sundayL._links ? <RecipeCard recipe={props.week.sundayL} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">D</td>
                        <td> { props.week.mondayD && props.week.mondayD._links ? <RecipeCard recipe={props.week.mondayD} /> : '' } </td>
                        <td> { props.week.tuesdayD && props.week.tuesdayD._links ? <RecipeCard recipe={props.week.tuesdayD} /> : '' } </td>
                        <td> { props.week.wednesdayD && props.week.wednesdayD._links ? <RecipeCard recipe={props.week.wednesdayD} /> : '' } </td>
                        <td> { props.week.thursdayD && props.week.thursdayD._links ? <RecipeCard recipe={props.week.thursdayD} /> : '' } </td>
                        <td> { props.week.fridayD && props.week.fridayD._links ? <RecipeCard recipe={props.week.fridayD} /> : '' } </td>
                        <td> { props.week.saturdayD && props.week.saturdayD._links ? <RecipeCard recipe={props.week.saturdayD} /> : '' } </td>
                        <td> { props.week.sundayD && props.week.sundayD._links ? <RecipeCard recipe={props.week.sundayD} /> : '' } </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeekShow;