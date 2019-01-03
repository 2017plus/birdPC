import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RouteConfig from './components/route/RouteConfig';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <main>
            <Switch>
              {RouteConfig.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
