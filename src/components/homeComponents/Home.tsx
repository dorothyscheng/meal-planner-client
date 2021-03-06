import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import QueryCard from './QueryCard';

interface queryOption {
    parameter: string,
    query: string,
    image: string,
}

interface Props {
    redirectToDash: boolean,
    resetRedirect: () => void,
}

const Home = (props: Props): JSX.Element => {
    useEffect(() => {
        if (props.redirectToDash) {
            props.resetRedirect();
        };
    });

    if (props.redirectToDash) {
        return <Redirect to="/dashboard" />
    };
    
    const queryOptions: queryOption[] = [
        {parameter: 'mealType', query: 'dinner', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {parameter: 'health', query: 'dairy-free', image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80'},
        {parameter: 'cuisineType', query: 'asian', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {parameter: 'health', query: 'gluten-free', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'},
        {parameter: 'health', query: 'paleo', image: 'https://images.unsplash.com/photo-1598515211932-b130a728a769?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {parameter: 'mealType', query: 'breakfast', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {parameter: 'cuisineType', query: 'italian', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {parameter: 'health', query: 'vegan', image: 'https://images.unsplash.com/photo-1600850056064-a8b380df8395?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'},
        {parameter: 'health', query: 'vegetarian', image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'},
        {parameter: 'mealType', query: 'lunch', image: 'https://images.unsplash.com/photo-1574782091246-c65ed4510300?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'},
    ];
    const queryCards = queryOptions.map(option => <QueryCard key={ option.query } query={ option.query } parameter={ option.parameter } image={ option.image } />)
    return (
        <>
            <div className="home-title-div">
                <h1 className="main-title home-title">Meal planning made simple.</h1>
            </div>
            <h2 className="section-title">We help you get and stay organized!</h2>
            <div className="how-div">
                <div className="how-text"><i className="far fa-user-circle"></i>Create an account and browse thousands of recipes.</div>
                <div className="how-text"><i className="far fa-plus-square"></i>Add your family's favorite recipes to customizable lists.</div>
                <div className="how-text"><i className="far fa-calendar-alt"></i>Turn your lists into weekly meal plans which you can use again and again.</div>
            </div>
            <h2 className="section-title">Browse our recipes</h2>
            <div className="card-container">
                { queryCards }
            </div>
        </>
    );
}

export default Home;