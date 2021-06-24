import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Week from '../../models/Week.interface';
import RecipeCard from '../recipeComponents/RecipeCard';

interface Props {
    week: Week | null,
    recipeEquipped?: boolean,
    handleMealSelectOrRemove?: (e: React.MouseEvent) => void,
    origin?: string,
    handleUpdateWeek?: (week: Week) => void,
}

const WeekShow = (props: Props): JSX.Element => {
    const [redirect, setRedirect] = useState(false);
    if (redirect) return <Redirect to='/dashboard' />
    if (!props.week) return <h3>Loading...</h3>;

    let tdClass = '';
    if (props.recipeEquipped) {
        tdClass = "available";
    };

    const editDeleteButtons = (
        <>
            <Link className="btn cancel-btn" to={`/dashboard/${props.week._id}/edit`}>Edit</Link>
            <p className="btn delete-btn">Delete</p>
        </>
    );
    const handleSubmit = (): void => {
        if (props.week && props.handleUpdateWeek) {
            const weekNameInput = document.getElementById('week-name') as HTMLInputElement;
            let weekName = props.week.name;
            if (weekNameInput && weekNameInput.value) {
                weekName = weekNameInput.value;
            }
            props.handleUpdateWeek({
                ...props.week,
                name: weekName,
            });
            setRedirect(true);
        };
    };
    
    const saveButton = <p className="btn submit-btn" onClick={handleSubmit}>Save</p>;
    const weekNameInput = (
        <>
            <label htmlFor="week-name">Week Name: </label>
            <input id="week-name" type="text" name="week-name" placeholder={props.week.name} />
        </>
    )


    return (
        <div className="week-show-container">
            <div className="week-show-title">
                <h2>{props.handleUpdateWeek ? weekNameInput: props.week.name }</h2>
                <div className="actions">
                    { props.handleUpdateWeek ? saveButton : editDeleteButtons }
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
                        <td id="mondayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.mondayB && props.week.mondayB._links ? <RecipeCard origin={props.origin} recipe={props.week.mondayB} /> : '' } </td>
                        <td id="tuesdayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.tuesdayB && props.week.tuesdayB._links ? <RecipeCard origin={props.origin} recipe={props.week.tuesdayB} /> : '' } </td>
                        <td id="wednesdayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.wednesdayB && props.week.wednesdayB._links ? <RecipeCard origin={props.origin} recipe={props.week.wednesdayB} /> : '' } </td>
                        <td id="thursdayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.thursdayB && props.week.thursdayB._links ? <RecipeCard origin={props.origin} recipe={props.week.thursdayB} /> : '' } </td>
                        <td id="fridayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.fridayB && props.week.fridayB._links ? <RecipeCard origin={props.origin} recipe={props.week.fridayB} /> : '' } </td>
                        <td id="saturdayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.saturdayB && props.week.saturdayB._links ? <RecipeCard origin={props.origin} recipe={props.week.saturdayB} /> : '' } </td>
                        <td id="sundayB" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.sundayB && props.week.sundayB._links ? <RecipeCard origin={props.origin} recipe={props.week.sundayB} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">L</td>
                        <td id="mondayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.mondayL && props.week.mondayL._links ? <RecipeCard origin={props.origin} recipe={props.week.mondayL} /> : '' } </td>
                        <td id="tuesdayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.tuesdayL && props.week.tuesdayL._links ? <RecipeCard origin={props.origin} recipe={props.week.tuesdayL} /> : '' } </td>
                        <td id="wednesdayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.wednesdayL && props.week.wednesdayL._links ? <RecipeCard origin={props.origin} recipe={props.week.wednesdayL} /> : '' } </td>
                        <td id="thursdayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.thursdayL && props.week.thursdayL._links ? <RecipeCard origin={props.origin} recipe={props.week.thursdayL} /> : '' } </td>
                        <td id="fridayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.fridayL && props.week.fridayL._links ? <RecipeCard origin={props.origin} recipe={props.week.fridayL} /> : '' } </td>
                        <td id="saturdayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.saturdayL && props.week.saturdayL._links ? <RecipeCard origin={props.origin} recipe={props.week.saturdayL} /> : '' } </td>
                        <td id="sundayL" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.sundayL && props.week.sundayL._links ? <RecipeCard origin={props.origin} recipe={props.week.sundayL} /> : '' } </td>
                    </tr>
                    <tr>
                        <td className="meal-title">D</td>
                        <td id="mondayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.mondayD && props.week.mondayD._links ? <RecipeCard origin={props.origin} recipe={props.week.mondayD} /> : '' } </td>
                        <td id="tuesdayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.tuesdayD && props.week.tuesdayD._links ? <RecipeCard origin={props.origin} recipe={props.week.tuesdayD} /> : '' } </td>
                        <td id="wednesdayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.wednesdayD && props.week.wednesdayD._links ? <RecipeCard origin={props.origin} recipe={props.week.wednesdayD} /> : '' } </td>
                        <td id="thursdayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.thursdayD && props.week.thursdayD._links ? <RecipeCard origin={props.origin} recipe={props.week.thursdayD} /> : '' } </td>
                        <td id="fridayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.fridayD && props.week.fridayD._links ? <RecipeCard origin={props.origin} recipe={props.week.fridayD} /> : '' } </td>
                        <td id="saturdayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.saturdayD && props.week.saturdayD._links ? <RecipeCard origin={props.origin} recipe={props.week.saturdayD} /> : '' } </td>
                        <td id="sundayD" className={tdClass} onClick={ props.handleMealSelectOrRemove ? props.handleMealSelectOrRemove : ()=>{}}> { props.week.sundayD && props.week.sundayD._links ? <RecipeCard origin={props.origin} recipe={props.week.sundayD} /> : '' } </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeekShow;