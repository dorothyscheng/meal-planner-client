import QueryCard from './QueryCard';

interface queryOption {
    parameter: string,
    query: string
}

const Home = (): JSX.Element => {
    const queryOptions: queryOption[] = [
        {parameter: 'q', query: 'chicken'},
        {parameter: 'health', query: 'dairy-free'},
        {parameter: 'health', query: 'gluten-free'},
        {parameter: 'health', query: 'paleo'},
        {parameter: 'health', query: 'vegan'},
        {parameter: 'health', query: 'vegetarian'},
        {parameter: 'cuisineType', query: 'asian'},
        {parameter: 'cuisineType', query: 'italian'},
        {parameter: 'mealType', query: 'dinner'},
        {parameter: 'mealType', query: 'breakfast'},
        {parameter: 'mealType', query: 'lunch'},
    ];
    const queryCards = queryOptions.map(option => <QueryCard key={ option.query } query={ option.query } parameter={ option.parameter } />)
    return (
        <div>
            <h1>My meal planning app!</h1>
            { queryCards }
        </div>
    );
}

export default Home;