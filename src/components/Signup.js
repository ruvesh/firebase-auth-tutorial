import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Signup() {
    const { signUp } = useAuth()
    const emailRef = useRef() 
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [ error, setError ] = useState('')  
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords do not match')
        }
        if(passwordRef.current.value.length < 6 ){
            return setError('Password length should be more than 6')
        }
        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }
 
    return (
        <>
            <Card className="rounded bg-light">
                <Card.Body>
                    <h3 className="text-center mb-3">Sign Up</h3>
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
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt-2">Already have an account? 
            &nbsp;<Link to="/login">Log In</Link></div>
        </>
    )
}

export default Signup
