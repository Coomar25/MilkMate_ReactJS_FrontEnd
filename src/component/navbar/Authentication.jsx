import React from 'react'
import AuthUser from '../AuthUser/AuthUser'
import GuestUser from './GuestUser'
import AuthenticatedUser from './AuthenticatedUser'
import AdminDashboard from '../Admin/AdminDashboard'

const Authentication = () => {
    const { getToken } = AuthUser();
    const { getUtype } = AuthUser();
    // const { usertype } = AuthUser();
    if (!getToken()) {
        return <GuestUser />
    }
    if (getUtype() === "ADM") {
        return <AdminDashboard />
    }
    return (
        <AuthenticatedUser />
    )

}

export default Authentication