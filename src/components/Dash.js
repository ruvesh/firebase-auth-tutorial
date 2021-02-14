import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, Button, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

export default function Dash() {
    const { logout, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleLogout(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await logout()
            history.push("/login")
        }
        catch {
            setError('Failed to logout')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                <h3 className="text-center mb-3">Profile</h3>
                { error && <Alert variant="danger">{error}</Alert>}
                { currentUser && <strong>{currentUser.email}</strong>}
                <Link className="btn btn-primary mt-2 w-100" to="/update-profile">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button disabled={loading} variant="link" onClick={handleLogout}>Log out</Button>
            </div>
            
        </>
    )
}
