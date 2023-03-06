import { EthProvider } from './contexts/EthContext'
import HomePage from "./components/screens/HomePage";
import FirebaseLogin from "./components/screens/FirebaseLogin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


function App(props) {
  return (
    <>
      <EthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <FirebaseLogin  {...props} />
            </Route>
            <Route exact path="/home">
              <HomePage  {...props} />
            </Route>
          </Switch>
        </Router>
      </EthProvider>
    </>
  );
}

export default App;
