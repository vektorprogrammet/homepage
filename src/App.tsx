import React from 'react';
import AppHeader from './components/Header/AppHeader';


import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import RoutedComponent from './components/RoutedComponent';

const App = function() : JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <AppHeader/>
        </header>
        <div className="content">
          <Switch>

            {/* Use component when the rendered component needs no props */}
            <Route path="/test_route" exact component={RoutedComponent} />

            {/* Use render when the rendered component needs props */}
            <Route path="/test_route_with_props" exact 
            render={ () => (
              <RoutedComponent showText="This is a prop!"/>
            )} 
            />

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
