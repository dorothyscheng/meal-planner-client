import { Switch, Route } from 'react-router-dom';

import Home from '../components/homeComponents/Home';
import RecipeContainer from '../containers/RecipeContainer';
import RecipeShow from '../components/recipeComponents/RecipeShow';

const Routes = (): JSX.Element => {
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/recipes/:id' component={ RecipeShow } />
        <Route path='/recipes' render={(props) => <RecipeContainer {...props} />} />
        {/* <Route exact path='/dashboard' component={ UserContainer } /> */}
      </Switch>
    )
}

export default Routes;