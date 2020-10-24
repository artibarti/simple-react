import Welcome from './welcome/Welcome'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './home/Home'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/home" component={Home} />
          <Route render={() => <Redirect to='/welcome' />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
