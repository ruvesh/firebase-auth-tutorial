import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function UpdateProfile() {
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const emailRef = useRef() 
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [ error, setError ] = useState('')  
    const [ loading, setLoading ] = useState(false)
    const [ changed, setChanged ] = useState(false)
    const history = useHistory()

    function handleOnChange(){
        if(passwordRef.current.value.length === 0){
            setChanged(false)
        }
        else{
            confirmPasswordRef.current.value = ""
            setChanged(true)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords do not match')
        }
        if(passwordRef.current.value.length < 6 && passwordRef.current.value){
            return setError('Password length should be more than 6')
        }
       
        const promises = []
        setLoading(true)
        setError('')
        if(emailRef.current.value !== currentUser.email){ 
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError('Failed to update profile')
        }).finally(() => {
            setLoading(false)
        })
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
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} 
                                placeholder="Leave blank to keep unchanged"
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} disabled={!changed}/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} type="submit" className="w-100">Update Profile</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt-2">
            &nbsp;<Link to="/">Profile</Link></div>
        </>
    )
}

export default UpdateProfile
