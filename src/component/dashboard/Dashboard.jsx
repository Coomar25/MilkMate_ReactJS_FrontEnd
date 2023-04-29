import React from 'react'
import AuthUser from '../AuthUser/AuthUser'

const Dashboard = () => {
    const { user } = AuthUser();
    return (
        <div>
            <h4>Name</h4>
            <p>{user.name}</p>
            <h4>Email</h4>
            <p>{user.email}</p>
        </div>
    )
}

export default Dashboard