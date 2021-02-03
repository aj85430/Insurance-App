import './App.css';
import store from './store'
import { Switch, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import NavbarComponent from './components/NavbarComponent';
import React, { Component } from 'react';
import About from './components/About';
import HomePage from './components/HomePage';
import ProductComponent from './components/ProductComponent';
import {getCardConfig} from './Configs/cardConfig'

class App extends Component {
  render() {

    /* Product Config */
    const config = getCardConfig();

    return (
      <div>
         <Provider store={store}>
          <NavbarComponent config={config}/>
          <Switch>
             <Route exact path={["/", "/home"]} component={HomePage} />
             <Route exact path="/about" component={About} />

             {/* Dyanamic Routes for different Insurance Products */}
             {
               config.map( item => {
                return (
                <Route key={item.productID} exact path={item.navigationPath} render={props =>(
                  <React.Fragment>
                    <ProductComponent config={item} history={this.props.history}/>
                  </React.Fragment>
                  )}>
                </Route>
               )
               })
             }
             {/* <Route exact path="/quote" component={QuoteComponent} /> */}
             {/* <Route exact path="/car-insurance" component={ProductComponent} /> */}              
          </Switch>         
         </Provider>
      </div>
    );
  }
}

export default App;