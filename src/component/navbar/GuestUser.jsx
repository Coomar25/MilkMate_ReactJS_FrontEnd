import React from 'react';
import { NavLink, Router, navLinksStyles } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from '../login/Login'
import GuestDashboard from '../dashboard/GuestDashboard'
import AuthUser from '../AuthUser/AuthUser';
import ForgotPasswordLink from '../login/ForgotPasswordLink';

const GuestUser = () => {

    const navLinksStyles = ({ isActive }) => {
        return {
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "red" : "black",
        };
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarButtonsExample">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Dashboard</a>
                            </li>
                        </ul>


                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-link px-3 me-2">
                                <NavLink style={navLinksStyles} to="/" >Dashboard</NavLink>
                            </button>
                            <button type="button" className="btn btn-link px-3 me-2">
                                <NavLink style={navLinksStyles} to='/login' >Login</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<GuestDashboard />} />
                    <Route path="/forgetpassword" element={<ForgotPasswordLink />} />
                </Routes>
            </div>

        </div>
    );
};

export default GuestUser;


