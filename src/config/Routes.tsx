import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';

const Routes = (): JSX.Element => {
    return (
        <Switch>
          <Route exact path='/' component={ Home } />
          {/* <Route exact path='/dashboard' component={ UserContainer } /> */}
        </Switch>
    )
}

export default Routes;