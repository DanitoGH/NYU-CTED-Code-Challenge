import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Dashboard Component
import Dashboard from './dashboard/Dashboard';

const App = () =>  {
  return (
      <Router>
          <div className="content-wrapper">
            <Switch>
               <Route exact path="/" component={ Dashboard } />
            </Switch>
          </div>
     </Router>
   )
}

export default App;
