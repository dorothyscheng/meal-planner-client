import React from 'react';
import { RouteComponentProps } from 'react-router';

import { RecipeLong } from '../models/Recipe.interface';
import RecipeCard from '../components/recipeComponents/RecipeCard';
import RecipeModel from '../models/RecipeModel';
import ListListModal from '../components/listComponents/ListListModal';
import List from '../models/List.interface';

interface Style {
    display: 'none' | 'flex',
}

interface QueryProperties {
    [key: string]: boolean,
}

interface LocationProps {
    querySearch?: string,
    parameter?: string,
    query?: string,
}

interface Props extends RouteComponentProps<{}, any, LocationProps | any> {
    lists: List[] | null,
    handleUpdateList: (list: List) => void,
}

interface State {
    recipes: RecipeLong[],
    next: string,
    from: number,
    to: number,
    total: number,
    showListListModal: boolean,
    selectedRecipe: RecipeLong | null,
    dietProperties: QueryProperties,
    healthProperties: QueryProperties,
    mealProperties: QueryProperties,
    dishTypeProperties: QueryProperties,
    cuisineTypeProperties: QueryProperties,
    querySearch: string,
    displayRecipeFilters: boolean,
}

class RecipeContainer extends React.Component<Props, State> {
    state: State = {
        recipes: [],
        next: '',
        from: 0,
        to: 0,
        total: 0,
        showListListModal: false,
        selectedRecipe: null,
        dietProperties: {
            'balanced': false,
            'high-protein': false,
            'low-carb': false,
            'low-fat': false,
        },
        healthProperties: {
            'alcohol-free': false,
            'dairy-free': false,
            'egg-free': false,
            'fish-free': false,
            'gluten-free': false,
            'keto-friendly': false,
            'paleo': false,
            'vegan': false,
            'vegetarian': false,
        },
        mealProperties: {
            breakfast: false,
            lunch: false,
            dinner: false,
        },
        dishTypeProperties: {
            desserts: false,
            drinks: false,
            'main course': false,
        },
        cuisineTypeProperties: {
            american: false,
            asian: false,
            caribbean: false,
            chinese: false,
            french: false,
            japanese: false,
            mexican: false,
            'south american': false,
            'south east asian': false, 
        },
        querySearch: '',
        displayRecipeFilters: true,
    }

    fetchRecipeQuery = (query: string): void => {
        RecipeModel.querySearch(query)
            .then(response => {
                if (response.count <=20) {
                    this.setState({
                        recipes: response.hits,
                        total: response.count,
                        from: response.from,
                        to: response.to,
                    })
                } else {
                    this.setState({
                        recipes: response.hits,
                        next: response._links.next.href,
                        from: response.from,
                        to: response.to,
                        total: response.count,
                    });
                }
            });
    }

    fetchRecipeNext = (url: string): void => {
        RecipeModel.next(url)
            .then(response => {
                this.setState({
                    recipes: response.hits,
                    next: response._links.next.href,
                    from: response.from,
                    to: response.to,
                    total: response.count,
                });
            });
    }

    showListListModal = (recipe: RecipeLong) => {
        this.setState({
            showListListModal: true,
            selectedRecipe: recipe,
        });
    }

    hideListListModal = () => {
        this.setState({
            showListListModal: false,
        })
    }

    handleRecipeSearch = (e: React.FormEvent): void => {
        e.preventDefault();
        let queryArr=[];
        if (this.state.querySearch.length > 0) {
            queryArr.push(`q=${this.state.querySearch}`);
        };
        const dietProperties = this.state.dietProperties;
        for (const property in dietProperties) {
            if (dietProperties[property]) {
                queryArr.push(`diet=${property}`);
            }
        };
        const healthProperties = this.state.healthProperties;
        for (const property in healthProperties) {
            if (healthProperties[property]) {
                queryArr.push(`health=${property}`);
            }
        };
        const mealProperties = this.state.mealProperties;
        for (const property in mealProperties) {
            if (mealProperties[property]) {
                queryArr.push(`mealType=${property}`);
            }
        };
        const dishTypeProperties = this.state.dishTypeProperties;
        for (const property in dishTypeProperties) {
            if (dishTypeProperties[property]) {
                queryArr.push(`dishType=${property}`);
            }
        };
        const cuisineTypeProperties = this.state.cuisineTypeProperties;
        for (const property in cuisineTypeProperties) {
            if (cuisineTypeProperties[property]) {
                queryArr.push(`cuisineType=${property}`);
            }
        };
        const query = queryArr.join('&');
        this.fetchRecipeQuery(query);
    }

    handleQuerySearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            querySearch: e.target.value,
        });
    }

    handleDietChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const property = e.target.value;
        let stateDietProperties: QueryProperties = {...this.state.dietProperties, [property]: e.target.checked};
        this.setState({
            dietProperties: stateDietProperties,
        });
    }

    handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const property = e.target.value;
        let stateHealthProperties: QueryProperties = {...this.state.healthProperties, [property]: e.target.checked};
        this.setState({
            healthProperties: stateHealthProperties,
        });
    }

    handleMealChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const property = e.target.value;
        let stateMealProperties: QueryProperties = {...this.state.mealProperties, [property]: e.target.checked};
        this.setState({
            mealProperties: stateMealProperties,
        });
    }

    handleDishTypeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const property = e.target.value;
        let stateDishTypeProperties: QueryProperties = {...this.state.dishTypeProperties, [property]: e.target.checked};
        this.setState({
            dishTypeProperties: stateDishTypeProperties,
        });
    }

    handleCuisineTypeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const property = e.target.value;
        let stateCuisineTypeProperties: QueryProperties = {...this.state.cuisineTypeProperties, [property]: e.target.checked};
        this.setState({
            cuisineTypeProperties: stateCuisineTypeProperties,
        });
    }

    showRecipeFilters = (): void => {
        this.setState({
            displayRecipeFilters: true,
        });
    }

    hideRecipeFilters = (): void => {
        this.setState({
            displayRecipeFilters: false,
        })
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.querySearch) {
            this.fetchRecipeQuery(this.props.location.state.querySearch);
            switch (this.props.location.state.parameter) {
                case ('mealType'):
                    let stateMealProperties: QueryProperties = {...this.state.mealProperties, [this.props.location.state.query]: true}
                    this.setState({
                        mealProperties: stateMealProperties,
                    });
                    break;
                case ('health'):
                    let stateHealthProperties: QueryProperties = {...this.state.healthProperties, [this.props.location.state.query]: true}
                    this.setState({
                        healthProperties: stateHealthProperties,
                    });
                    break;
                case ('cuisineType'):
                    let stateCuisineTypeProperties: QueryProperties = {...this.state.cuisineTypeProperties, [this.props.location.state.query]: true}
                    this.setState({
                        cuisineTypeProperties: stateCuisineTypeProperties,
                    });
                    break;
            };
        };
    }

    render(): JSX.Element {
        let style: Style = {
            display: 'flex',
        }
        if (!this.state.displayRecipeFilters) {
            style = {
                display: 'none',
            }
        };

        const hideButton = <p className="underline" onClick={this.hideRecipeFilters}>Hide</p>;
        const showButton = <p className="underline" onClick={this.showRecipeFilters}>Show</p>;

        const recipeSearch = (
            <div className="search-container">
                <div className="search-title">
                    <h3>Recipe Filters</h3>
                    { this.state.displayRecipeFilters ? hideButton : showButton }
                </div>
                <form className="search-form" onSubmit={this.handleRecipeSearch} style={style}>

                    <div className="search-div">
                        <label htmlFor="q">Search by name:</label>
                        <input type="text" value={this.state.querySearch} onChange={this.handleQuerySearchChange}></input>
                    </div>

                    <div className="search-div">
                        <h4>Overall Diet</h4>
                        <div className="search-term">
                            <input className="diet" type="checkbox" id="balanced" value="balanced" checked={this.state.dietProperties.balanced} onChange={this.handleDietChange}/>
                            <label htmlFor="balanced">Balanced</label>
                        </div>
                        <div className="search-term">
                            <input className="diet" type="checkbox" id="high-protein" value="high-protein" checked={this.state.dietProperties['high-protein']} onChange={this.handleDietChange}/>
                            <label htmlFor="High-Protein">High-Protein</label>
                        </div>
                        <div className="search-term">
                            <input className="diet" type="checkbox" id="low-carb" value="low-carb" checked={this.state.dietProperties['low-carb']} onChange={this.handleDietChange}/>
                            <label htmlFor="Low-Carb">Low-Carb</label>
                        </div>
                        <div className="search-term">
                            <input className="diet" type="checkbox" id="low-fat" value="low-fat" checked={this.state.dietProperties['low-fat']} onChange={this.handleDietChange}/>
                            <label htmlFor="Low-Fat">Low-Fat</label>
                        </div>
                    </div>

                    <div className="search-div">
                        <h4>Any dietary restrictions?</h4>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="alcohol-free" value="alcohol-free" checked={this.state.healthProperties['alcohol-free']} onChange={this.handleHealthChange}/>
                            <label htmlFor="Alcohol-Free">Alcohol-Free</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="dairy-free" value="dairy-free" checked={this.state.healthProperties['dairy-free']} onChange={this.handleHealthChange}/>
                            <label htmlFor="Dairy-Free">Dairy-Free</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="egg-free" value="egg-free" checked={this.state.healthProperties['egg-free']} onChange={this.handleHealthChange}/>
                            <label htmlFor="Egg-Free">Egg-Free</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="fish-free" value="fish-free" checked={this.state.healthProperties['fish-free']} onChange={this.handleHealthChange}/>
                            <label htmlFor="Fish-Free">Fish-Free</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="gluten-free" value="gluten-free" checked={this.state.healthProperties['gluten-free']} onChange={this.handleHealthChange}/>
                            <label htmlFor="Gluten-Free">Gluten-Free</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="keto-friendly" value="keto-friendly" checked={this.state.healthProperties['keto-friendly']} onChange={this.handleHealthChange}/>
                            <label htmlFor="Keto-Friendly">Keto-Friendly</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="paleo" value="paleo" checked={this.state.healthProperties.paleo} onChange={this.handleHealthChange}/>
                            <label htmlFor="Paleo">Paleo</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="vegan" value="vegan" checked={this.state.healthProperties.vegan} onChange={this.handleHealthChange}/>
                            <label htmlFor="Vegan">Vegan</label>
                        </div>
                        <div className="search-term">
                            <input className="health" type="checkbox" id="vegetarian" value="vegetarian" checked={this.state.healthProperties.vegetarian} onChange={this.handleHealthChange}/>
                            <label htmlFor="Vegetarian">Vegetarian</label>
                        </div>
                    </div>

                    <div className="search-div">
                        <h4>Meal</h4>
                        <div className="search-term">
                            <input className="mealType" type="checkbox" id="breakfast" value="breakfast" checked={this.state.mealProperties.breakfast} onChange={this.handleMealChange}/>
                            <label htmlFor="Breakfast">Breakfast</label>
                        </div>
                        <div className="search-term">
                            <input className="mealType" type="checkbox" id="lunch" value="lunch" checked={this.state.mealProperties.lunch} onChange={this.handleMealChange}/>
                            <label htmlFor="Lunch">Lunch</label>
                        </div>
                        <div className="search-term">
                            <input className="mealType" type="checkbox" id="dinner" value="dinner" checked={this.state.mealProperties.dinner} onChange={this.handleMealChange}/>
                            <label htmlFor="Dinner">Dinner</label>
                        </div>
                    </div>

                    <div className="search-div">
                        <h4>Dish Type</h4>
                        <div className="search-term">
                            <input className="dishType" type="checkbox" id="desserts" value="desserts" checked={this.state.dishTypeProperties.desserts} onChange={this.handleDishTypeChange}/>
                            <label htmlFor="Desserts">Desserts</label>
                        </div>
                        <div className="search-term">
                            <input className="dishType" type="checkbox" id="drinks" value="drinks" checked={this.state.dishTypeProperties.drinks} onChange={this.handleDishTypeChange}/>
                            <label htmlFor="Drinks">Drinks</label>
                        </div>
                        <div className="search-term">
                            <input className="dishType" type="checkbox" id="main-course" value="main course" checked={this.state.dishTypeProperties['main course']} onChange={this.handleDishTypeChange}/>
                            <label htmlFor="Main course">Main course</label>
                        </div>
                    </div>

                    <div className="search-div">
                        <h4>Cuisine Type</h4>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="american" value="american" checked={this.state.cuisineTypeProperties.american} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="American">American</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="asian" value="asian" checked={this.state.cuisineTypeProperties.asian} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="Asian">Asian</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="caribbean" value="caribbean" checked={this.state.cuisineTypeProperties.caribbean} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="Caribbean">Caribbean</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="chinese" value="chinese" checked={this.state.cuisineTypeProperties.chinese} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="Chinese">Chinese</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="french" value="french" checked={this.state.cuisineTypeProperties.french} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="French">French</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="japanese" value="japanese" checked={this.state.cuisineTypeProperties.japanese} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="Japanese">Japanese</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="mexican" value="mexican" checked={this.state.cuisineTypeProperties.mexican} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="Mexican">Mexican</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="south-american" value="south american" checked={this.state.cuisineTypeProperties['south american']} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="South American">South American</label>
                        </div>
                        <div className="search-term">
                            <input className="cuisineType" type="checkbox" id="south-east-asian" value="south east asian" checked={this.state.cuisineTypeProperties['south east asian']} onChange={this.handleCuisineTypeChange}/>
                            <label htmlFor="South East Asian">South East Asian</label>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Search</button>
                </form>
            </div>
        )

        if (this.state.recipes.length === 0) return recipeSearch;
        const recipeCards = this.state.recipes.map(recipe => <RecipeCard 
            key={recipe.recipe.uri} 
            recipe={recipe} 
            showListListModal={this.showListListModal} />)
        return (
            <>
                { recipeSearch }
                <div className="recipe-container">
                    <div className="search-title">
                        <h3>Showing recipes {this.state.from} to {this.state.to} of {this.state.total}</h3>
                        <p onClick={() => this.fetchRecipeNext(this.state.next)} className="underline">Next page</p>
                    </div>
                    <div className="card-container recipe-container">
                        { recipeCards }
                    </div>
                    <ListListModal 
                        display={this.state.showListListModal} 
                        hideListListModal={this.hideListListModal}
                        recipe={this.state.selectedRecipe}
                        lists={this.props.lists}
                        handleUpdateList={this.props.handleUpdateList} />
                </div>
            </>
        );
    }
};

export default RecipeContainer;