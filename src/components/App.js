import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 
import Login from './Login'
import Dash from './Dash'
import PrivateRoute from './PrivateRoute'
 
function App() {
  return (
    <>
      <h1>Firebase Auth Tutorial</h1>
      <Container className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh"}}
      >
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dash} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </AuthProvider>
          </Router>
        </div> 
      </Container> 
    </>

  );
}

export default App;
