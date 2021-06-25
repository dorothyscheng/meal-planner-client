import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/homeComponents/Home';
import RecipeContainer from '../containers/RecipeContainer';
import RecipeShow from '../components/recipeComponents/RecipeShow';
import User from '../models/User.interface';
import UserDashboard from '../components/userComponents/UserDashboard';
import UserEdit from '../components/userComponents/UserEdit';
import List from '../models/List.interface';
import Week from '../models/Week.interface';
import EditWeek from '../components/weekComponents/EditWeek';

interface Props {
  user: User | null,
  updateMessage: string | null,
  handleUserEdit: (username: User['username'], user: User) => void,
  handleUserDelete: (user: User) => void,
  auth: User['username'] | null,
  handleCreateList: (list: List) => void,
  handleUpdateList: (list: List) => void,
  handleDeleteList: (list: List) => void,
  handleCreateWeek: (week: Week) => void,
  handleUpdateWeek: (week: Week) => void,
  handleDeleteWeek: (week: Week) => void,
}

const Routes = (props: Props): JSX.Element => {
  const auth = props.auth || localStorage.getItem('auth');
  const user = props.user;
  const updateMessage = props.updateMessage;
  const handleUpdateList = props.handleUpdateList;
  const handleUpdateWeek = props.handleUpdateWeek;
  const protectedRoutes = (
    <Switch>
      <Route exact path='/dashboard' render={() => <UserDashboard 
        user={user} 
        message={updateMessage} 
        handleUserDelete={props.handleUserDelete}
        handleCreateList={props.handleCreateList} 
        handleUpdateList={props.handleUpdateList}
        handleDeleteList={props.handleDeleteList}
        handleCreateWeek={props.handleCreateWeek}
        handleDeleteWeek={props.handleDeleteWeek}/>}/>
      <Route path='/dashboard/edit' render={() => <UserEdit user={user} handleUserEdit={props.handleUserEdit} />} />
      <Route path='/dashboard/:weekId/edit' render={(props) => <EditWeek {...props} user={user} handleUpdateWeek={handleUpdateWeek} />} />
    </Switch>
  )
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/recipes/:id' component={ RecipeShow } />
        <Route path='/recipes' render={(props) => <RecipeContainer 
          {...props} 
          lists={user && user.lists ? user.lists : null}
          handleUpdateList={handleUpdateList} />} />
        { auth ? protectedRoutes : <Redirect to="/" /> }
      </Switch>
    )
}

export default Routes;