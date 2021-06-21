import QueryCard from './QueryCard';

interface queryOption {
    parameter: string,
    query: string,
    image: string,
}

const Home = (): JSX.Element => {
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
                <h1 className="main-title home-title">Here to help you get organized and eat healthy!</h1>
            </div>
            <div className="home-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec consequat diam, quis efficitur eros. Nullam massa tortor, ultricies eget massa ac, molestie vestibulum orci. Ut semper justo ut mattis vulputate. Duis id iaculis nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec aliquam tellus. Vivamus pellentesque felis odio, vel cursus nulla malesuada non. Fusce volutpat, ligula et mattis posuere, dui tellus vehicula nulla, id cursus lacus tellus vel neque. Phasellus quis nisl vitae erat dapibus ornare. Donec pharetra feugiat leo, sit amet gravida massa feugiat quis. Nam ornare luctus volutpat. Morbi tristique velit non ligula laoreet iaculis. Aenean egestas molestie urna. Ut suscipit ligula placerat nunc placerat gravida. Phasellus hendrerit urna in neque bibendum placerat. Donec mattis, arcu id malesuada finibus, nunc elit elementum enim, a sagittis orci nisi ac nisl.
            </div>
            <h2 className="section-title">Browse our recipes</h2>
            <div className="card-container">
                { queryCards }
            </div>
            <h2 className="section-title">How it works</h2>
            <div className="home-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec consequat diam, quis efficitur eros. Nullam massa tortor, ultricies eget massa ac, molestie vestibulum orci. Ut semper justo ut mattis vulputate. Duis id iaculis nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec aliquam tellus. Vivamus pellentesque felis odio, vel cursus nulla malesuada non. Fusce volutpat, ligula et mattis posuere, dui tellus vehicula nulla, id cursus lacus tellus vel neque. Phasellus quis nisl vitae erat dapibus ornare. Donec pharetra feugiat leo, sit amet gravida massa feugiat quis. Nam ornare luctus volutpat. Morbi tristique velit non ligula laoreet iaculis. Aenean egestas molestie urna. Ut suscipit ligula placerat nunc placerat gravida. Phasellus hendrerit urna in neque bibendum placerat. Donec mattis, arcu id malesuada finibus, nunc elit elementum enim, a sagittis orci nisi ac nisl.
            </div>
        </>
    );
}

export default Home;