import { Switch, Route } from 'react-router-dom';

import Home from '../components/homeComponents/Home';
import RecipeContainer from '../containers/RecipeContainer';

const Routes = (): JSX.Element => {
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/recipes' render={(props) => <RecipeContainer {...props} />} />
        {/* <Route exact path='/dashboard' component={ UserContainer } /> */}
      </Switch>
    )
}

export default Routes;