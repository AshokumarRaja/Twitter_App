import "./App.css";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./FullPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import createBrowserHistory from "history/createBrowserHistory";
import Notification from "./Notification";
import Profile from "./Profile";
import ViewMessage from "./ViewMessage";
import UserProfile from "./UserProfile";
export const history = createBrowserHistory();
function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <ProtectedRoute exact={true} path="/home" component={Home} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/notification" component={Notification} />
          <ProtectedRoute path="/posts/:id" component={ViewMessage} />
          <ProtectedRoute path="/profile/:id" component={UserProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
