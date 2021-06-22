import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/homeComponents/Home';
import RecipeContainer from '../containers/RecipeContainer';
import RecipeShow from '../components/recipeComponents/RecipeShow';
import User from '../models/User.interface';
import UserDashboard from '../components/userComponents/UserDashboard';
import UserEdit from '../components/userComponents/UserEdit';
import List from '../models/List.interface';

interface Props {
  user: User | null,
  updateMessage: string | null,
  handleUserEdit: (username: User['username'], user: User) => void,
  handleUserDelete: (user: User) => void,
  auth: User['username'] | null,
  handleCreateList: (list: List) => void,
  handleUpdateList: (list: List) => void,
  handleDeleteList: (list: List) => void,
}

const Routes = (props: Props): JSX.Element => {
  const auth = props.auth || localStorage.getItem('auth');
  const user = props.user;
  const updateMessage = props.updateMessage;
  const handleUserEdit = props.handleUserEdit;
  const handleUserDelete = props.handleUserDelete;
  const handleCreateList = props.handleCreateList;
  const handleUpdateList = props.handleUpdateList;
  const handleDeleteList = props.handleDeleteList;
  const protectedRoutes = (
    <Switch>
      <Route exact path='/dashboard' render={(props) => <UserDashboard 
        {...props} 
        user={user} 
        message={updateMessage} 
        handleUserDelete={handleUserDelete}
        handleCreateList={handleCreateList} 
        handleUpdateList={handleUpdateList}
        handleDeleteList={handleDeleteList}/>}/>
      <Route path='/dashboard/edit' render={(props) => <UserEdit {...props} user={user} handleUserEdit={handleUserEdit} />} />
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