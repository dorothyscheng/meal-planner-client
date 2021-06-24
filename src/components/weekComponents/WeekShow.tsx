import { Link } from 'react-router-dom';

import Week from '../../models/Week.interface';
import RecipeCard from '../recipeComponents/RecipeCard';

interface Props {
    week: Week | null,
    recipeEquipped?: boolean,
}

const WeekShow = (props: Props): JSX.Element => {
    if (!props.week) return <h3>Loading...</h3>;
    let tdClass = '';
    if (props.recipeEquipped) {
        tdClass = "available";
    };
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
                        <td className={tdClass}> { props.week.mondayB && props.week.mondayB._links ? <RecipeCard recipe={props.week.mondayB} /> : '' } </td>
                        <td className={tdClass}> { props.week.tuesdayB && props.week.tuesdayB._links ? <RecipeCard recipe={props.week.tuesdayB} /> : '' } </td>
                        <td className={tdClass}> { props.week.wednesdayB && props.week.wednesdayB._links ? <RecipeCard recipe={props.week.wednesdayB} /> : '' } </td>
                        <td className={tdClass}> { props.week.thursdayB && props.week.thursdayB._links ? <RecipeCard recipe={props.week.thursdayB} /> : '' } </td>
                        <td className={tdClass}> { props.week.fridayB && props.week.fridayB._links ? <RecipeCard recipe={props.week.fridayB} /> : '' } </td>
                        <td className={tdClass}> { props.week.saturdayB && props.week.saturdayB._links ? <RecipeCard recipe={props.week.saturdayB} /> : '' } </td>
                        <td className={tdClass}> { props.week.sundayB && props.week.sundayB._links ? <RecipeCard recipe={props.week.sundayB} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">L</td>
                        <td className={tdClass}> { props.week.mondayL && props.week.mondayL._links ? <RecipeCard recipe={props.week.mondayL} /> : '' } </td>
                        <td className={tdClass}> { props.week.tuesdayL && props.week.tuesdayL._links ? <RecipeCard recipe={props.week.tuesdayL} /> : '' } </td>
                        <td className={tdClass}> { props.week.wednesdayL && props.week.wednesdayL._links ? <RecipeCard recipe={props.week.wednesdayL} /> : '' } </td>
                        <td className={tdClass}> { props.week.thursdayL && props.week.thursdayL._links ? <RecipeCard recipe={props.week.thursdayL} /> : '' } </td>
                        <td className={tdClass}> { props.week.fridayL && props.week.fridayL._links ? <RecipeCard recipe={props.week.fridayL} /> : '' } </td>
                        <td className={tdClass}> { props.week.saturdayL && props.week.saturdayL._links ? <RecipeCard recipe={props.week.saturdayL} /> : '' } </td>
                        <td className={tdClass}> { props.week.sundayL && props.week.sundayL._links ? <RecipeCard recipe={props.week.sundayL} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">D</td>
                        <td className={tdClass}> { props.week.mondayD && props.week.mondayD._links ? <RecipeCard recipe={props.week.mondayD} /> : '' } </td>
                        <td className={tdClass}> { props.week.tuesdayD && props.week.tuesdayD._links ? <RecipeCard recipe={props.week.tuesdayD} /> : '' } </td>
                        <td className={tdClass}> { props.week.wednesdayD && props.week.wednesdayD._links ? <RecipeCard recipe={props.week.wednesdayD} /> : '' } </td>
                        <td className={tdClass}> { props.week.thursdayD && props.week.thursdayD._links ? <RecipeCard recipe={props.week.thursdayD} /> : '' } </td>
                        <td className={tdClass}> { props.week.fridayD && props.week.fridayD._links ? <RecipeCard recipe={props.week.fridayD} /> : '' } </td>
                        <td className={tdClass}> { props.week.saturdayD && props.week.saturdayD._links ? <RecipeCard recipe={props.week.saturdayD} /> : '' } </td>
                        <td className={tdClass}> { props.week.sundayD && props.week.sundayD._links ? <RecipeCard recipe={props.week.sundayD} /> : '' } </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeekShow;