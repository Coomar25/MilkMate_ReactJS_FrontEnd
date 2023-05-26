import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthUser from '../../AuthUser/AuthUser'
const Aside = () => {
    const { logout, token } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    return (
        <div>
            <aside>
                <div class="top">
                    <div class="logo">
                        <img src="" alt="" />
                        <h1>D<span class="logoColor text-muted">airy</span> </h1>
                    </div>
                    <div class="close" id="close-btn">
                        <span class="material-icons-sharp">
                            close
                        </span>
                    </div>
                </div>

                <div class="sidebar">


                    <NavLink to='/home' >
                        <span class="material-icons-sharp">
                            dashboard
                        </span>
                        <h3>Home  </h3>
                    </NavLink>


                    <NavLink to='/record' >
                        <span class="material-icons-sharp">
                            grading
                        </span>
                        <h3 >Daily Records</h3>
                    </NavLink>


                    <NavLink to='/order'>
                        <span class="material-icons-sharp">
                            production_quantity_limits
                        </span>
                        <h3>Order</h3>
                    </NavLink>

                    <NavLink to='/analytics'>
                        <span class="material-icons-sharp">
                            webhook
                        </span>
                        <h3>Analytics</h3>

                    </NavLink>


                    {/* <NavLink to='/setting'>
                        <span class="material-icons-sharp">
                            settings
                        </span>
                        <h3>Setting</h3>
                    </NavLink> */}


                    <NavLink to='/login' onClick={logoutUser}>
                        <span class="material-icons-sharp">
                            logout
                        </span>
                        <h3>Logout</h3>
                    </NavLink>
                </div>

            </aside>



        </div>
    )
}

export default Aside