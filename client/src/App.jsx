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
import ProductSearch from './components/screens/ProductSearch';
import ProductPage from './components/screens/ProductPage';
import Header from './components/Header';
import Footer from './components/footer';
import { useEffect, useState } from 'react';
// const bootstrap = require("bootstrap");

function App(props) {

  const [search , setAppSearch] = useState('')

  function setSearchCallback(newQuery){
    setAppSearch(newQuery)
  }

  useEffect(()=>[
    console.log('app search' , search)
  ] , [search])

  return (
    <>
      <EthProvider>
        <Router>
          <Header search_query={search} setAppSearch={setSearchCallback}/>
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
            <Route exact path="/product_search">
              <ProductSearch  {...props } search_query={search} />
            </Route>
            <Route exact path="/product/:productID"
              component={ProductPage} />
          </Switch>
        <Footer />
        </Router>
      </EthProvider>
    </>
  );
}

export default App;
