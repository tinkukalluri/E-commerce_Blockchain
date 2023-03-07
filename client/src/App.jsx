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
import Cart from './components/screens/Cart';
import Checkout from './components/screens/Checkout';
import AddProduct from './components/screens/AddProduct';
// const bootstrap = require("bootstrap");

function App(props) {
  return (
    <>
      <EthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage  {...props} />
            </Route>
            <Route exact path="/login">
              <FirebaseLogin  {...props} />
            </Route>
            <Route exact path="/cart">
              <Cart  {...props} />
            </Route>
            <Route exact path="/checkout">
              <Checkout  {...props} />
            </Route>
            <Route exact path="/add_product">
              <AddProduct  {...props} />
            </Route>
          </Switch>
        </Router>
      </EthProvider>
    </>
  );
}

export default App;
