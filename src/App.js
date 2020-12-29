import './App.css';
import Sidebar from './Sidebar'
import SignUp from './SignUp'
import Login from './Login'
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
         
          <Route path="/home" component={Sidebar}/>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
