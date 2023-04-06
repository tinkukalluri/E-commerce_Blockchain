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
import TinWallet from './components/screens/TinWallet';
import ViewOrders from './components/screens/ViewOrders';
import ViewOrderItems from './components/screens/ViewOrderItems';
import LoadingFullScreen from './components/LoadingFullScreen';
import Wishlist from './components/screens/Wishlist';
// const bootstrap = require("bootstrap");

function App(props) {
  console.log('app component re-rendered')
  const [search, setAppSearch] = useState('')
  const [authResultApp, setAuthResultApp] = useState(false)

  function setSearchCallback(newQuery) {
    setAppSearch(newQuery)
  }

  useEffect(() => {
    console.log('search updated in App.jsx')
    console.log(search)
  }, [search])

  useEffect(() => [
    console.log('app search', search)
  ], [search])

  return (
    <>
      <EthProvider>
        <Router>
          <Header search_query={search} setAppSearch={setSearchCallback} authResultApp={authResultApp} setAuthResultApp={setAuthResultApp} />
          <Switch>
            <div className='root' style={{ 'minHeight': "70vh" }} >
              <Route exact path="/">
                <HomePage  {...props} />
              </Route>
              <Route exact path="/login">
                <FirebaseLogin  {...props} setAuthResultApp={setAuthResultApp} />
              </Route>
              <Route exact path="/cart">
                <Cart  {...props} />
              </Route>
              <Route exact path="/wishlist"
                component={Wishlist}/>
              <Route exact path="/checkout">
                <Checkout  {...props} />
              </Route>
              <Route exact path="/add_product">
                <AddProduct  {...props} />
              </Route>
              <Route exact path="/product_search">
                <ProductSearch  {...props} search_query={search} />
              </Route>
              <Route exact path="/tin_wallet">
                <TinWallet {...props}/>
              </Route>
              <Route exact path="/product/:productID"
                component={ProductPage} />
              <Route exact path="/orders">
                <ViewOrders {...props}/>
              </Route>
              <Route exact path="/order_items"
                component={ViewOrderItems}/>
              <Route exact path="/test_component"
                component={LoadingFullScreen}/>
            </div>
          </Switch>
          <Footer />
        </Router>
      </EthProvider>
    </>
  );
}

export default App;
