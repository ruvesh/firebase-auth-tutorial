import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
    const { signUp, currentUser } = useAuth()
    const emailRef = useRef() 
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [ error, setError ] = useState('')  
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
        }
        catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <Card className="w-25 justify-content-center align-items-center bg-light rounded p-5">
            <Form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                { error && <Alert variant="danger">{error}</Alert>}
                { currentUser && <b>{currentUser.email}</b>}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" ref={emailRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} required/>
                </Form.Group>
                <Form.Group>
                    <Button disabled={loading} type="submit">Sign Up</Button>
                </Form.Group>
            </Form>
            <h6>Already have an account? Log In</h6>
        </Card>
    )
}

export default Signup
