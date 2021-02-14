import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function ResetPassword() {
    const { resetPassword } = useAuth()
    const emailRef = useRef() 
    const [ error, setError ] = useState('')  
    const [ message, setMessage ] = useState('')  

    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
        }
        catch {
            setError('Failed to reset password')
        }
        setLoading(false)
        setMessage('Please check your inbox for further instructions')
    }
 
    return (
        <>
            <Card className="rounded bg-light">
                <Card.Body>
                    <h3 className="text-center mb-3">Reset Password</h3>
                    <Form onSubmit={handleSubmit}>
                        { error && <Alert variant="danger">{error}</Alert>}
                        { message && <Alert variant="success">{message}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">Reset Password</Button>
                        </Form.Group>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt-2">Need an Account? &nbsp; 
            <Link to="/signup">Register</Link></div>
        </>
    )
}

export default ResetPassword