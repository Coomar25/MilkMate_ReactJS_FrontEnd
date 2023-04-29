
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Incomestatus from '../incomestatus/Incomestatus'
import AuthUser from '../AuthUser/AuthUser';
import GuestUser from './GuestUser';
import { useState } from 'react';
import './authUser.css'
import Aside from '../dashboard/dashboardComponent/Aside';
import Main from '../dashboard/dashboardComponent/Main';
import Record from '..//dashboard/Record';
import Order from '../dashboard/Order';

function Auth() {
    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }

    // const { getToken } = AuthUser();
    // if (!getToken()) {
    //     return <GuestUser />
    // }


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand me-2" href="https://mdbgo.com/">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                            height="16"
                            alt="MDB Logo"
                            loading="lazy"
                            style={{ marginTop: "-1px" }}
                        />
                    </a>
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
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </button>
                            <button type="button" className="btn btn-link px-3 me-2">
                                <Link className="nav-link" to="/incomestatus">Income Status</Link>
                            </button>
                            <button type="button" className="btn btn-link px-3 me-2">
                                <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* =================================================================================================================== */}
            {/* =================================================================================================================== */}
            {/* =================================================================================================================== */}




            <div class="container-fluid container">
                <Aside />
                <div className="container">
                    <Routes>
                        {/* <Route path='/' element={<Dashboard />} /> */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/incomestatus" element={<Incomestatus />} />
                        <Route path='/home' element={<Main />} />
                        <Route path='/record' element={<Record />} />
                        <Route path='/order' element={<Order />} />
                    </Routes>
                </div>
            </div>


            {/* =================================================================================================================== */}
            {/* =================================================================================================================== */}
            {/* =================================================================================================================== */}


        </>
    );
}

export default Auth;

