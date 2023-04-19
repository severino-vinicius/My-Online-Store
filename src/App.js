import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        {/* render={ () => <Home research={ research } /> } */}
      </Switch>
    </div>
  );
}

export default App;
