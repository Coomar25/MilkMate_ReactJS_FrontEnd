import React from 'react'
import "./css/navbar.css"
import { Routes, Route, NavLink } from 'react-router-dom'
import Farmer from './component/Farmer'
import DeliveryRecord from './component/DeliveryRecord'
import Register from './component/Register'
import Inventory from './component/Inventory'
import UserOrder from './component/UserOrder'
import AuthUser from '../AuthUser/AuthUser'
import MailRegister from './component/MailRegister'
// import RedesignedAdminDashboard from './component/RedesignedAdminDashboard'


const AdminDashboard = () => {
    const { token, logout } = AuthUser();
    const logoutAdmin = () => {
        if (token !== undefined) {
            logout();
        }
    }
    return (
        <div>
            <div className="adminNavbar">
                <NavLink to='/dashboard'>  <a href="#">Farmer</a> </NavLink>
                <NavLink to='/record'>  <a href="#">Collection Record</a> </NavLink>
                <NavLink to='/register'>  <a href="#">Register</a> </NavLink>
                <NavLink to='/inventory'>  <a href="#">Inventory</a> </NavLink>
                <NavLink to='/userOrder'>  <a href="#">Order</a> </NavLink>
                <NavLink to='/mailRegister'>  <a href="#" >Mail Register</a> </NavLink>
                {/* <NavLink to='/newadmin'>  <a href="#" >New Admin</a> </NavLink> */}
                <a href="#">  <span role="button" className="nav-link" onClick={logoutAdmin}>Logout</span></a>
                <div className="animation "></div>
            </div>


            <div className="container">
                <Routes>
                    <Route path="/dashboard" element={<Farmer />} />
                    <Route path="/record" element={<DeliveryRecord />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/userOrder" element={<UserOrder />} />
                    <Route path="/mailRegister" element={<MailRegister />} />
                    {/* <Route path="/newadmin" element={<RedesignedAdminDashboard />} /> */}
                </Routes>
            </div>

        </div>
    )
}

export default AdminDashboard