import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/homeComponents/Home';
import RecipeContainer from '../containers/RecipeContainer';
import RecipeShow from '../components/recipeComponents/RecipeShow';
import User from '../models/User.interface';
import UserDashboard from '../components/userComponents/UserDashboard';

interface Props {
  user: User | null,
}

const Routes = (props: Props): JSX.Element => {
  const auth = localStorage.getItem('auth');
  const user = props.user;
  const protectedRoutes = (
    <Switch>
      <Route exact path='/dashboard' render={(props) => <UserDashboard {...props} user={user} />} />
    </Switch>
  )
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/recipes/:id' component={ RecipeShow } />
        <Route path='/recipes' render={(props) => <RecipeContainer {...props} />} />
        { auth ? protectedRoutes : <Redirect to="/" /> }
      </Switch>
    )
}

export default Routes;