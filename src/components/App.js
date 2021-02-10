import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
      <AuthProvider>
        <h1>Firebase Auth Tutorial</h1>
        <Container className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh"}}
        >
          <div className="w-100" style={{ maxWidth: "400px"}}>
            
            <Signup />
          </div>
        </Container> 
      </AuthProvider>
    </>

  );
}

export default App;
