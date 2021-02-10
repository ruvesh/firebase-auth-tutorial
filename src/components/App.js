import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <h1>Firebase Auth Tutorial</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Signup />
      </div>
     
    </AuthProvider>
  );
}

export default App;
