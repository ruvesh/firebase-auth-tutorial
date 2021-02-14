import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const { login } = useAuth()
    const emailRef = useRef() 
    const passwordRef = useRef()
    const [ error, setError ] = useState('')  
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch {
            setError('Failed to login')
        }
        setLoading(false)
    }
 
    return (
        <>
            <Card className="rounded bg-light">
                <Card.Body>
                    <h3 className="text-center mb-3">Log In</h3>
                    <Form onSubmit={handleSubmit}>
                        { error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">Login</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt-2">Need an Account? &nbsp; 
            <Link to="/signup">Register</Link></div>
        </>
    )
}

export default Login
