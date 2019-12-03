import React from 'react';
import Dashboard from './components/Dashboad'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Mydashboard from './components/Mydashboard'
import Updateshipment from './components/Updateshipment'
import Addshipment from './components/Addshipment'
import Signup from './components/Signup'
import history from './history'
/*
The first component or we can say heart of our web app is App component which get called by react.
It further loads all other component depenting upon the routes.
*/
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          
          <Switch>
            <Router history={history}>
              <Route exact path='/' component ={Dashboard} /> 
              <Route path ='/Login' component={Login} />
              <Route path ='/Signup' component={Signup} />
              <Route path ='/Home' component={Home} />
              <Route path ='/About' component={About} />
              <Route path ='/Mydashboard' component={Mydashboard} />
              <Route path ='/Updateshipment/:id' component={Updateshipment} />
              <Route path ='/Addshipment' component={Addshipment} />
            </Router>
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
