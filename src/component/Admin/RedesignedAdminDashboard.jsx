import React from 'react'
import './admincss/style.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Farmer from './component/Farmer'
import DeliveryRecord from './component/DeliveryRecord'
import Register from './component/Register'
import Inventory from './component/Inventory'
import UserOrder from './component/UserOrder'
import MailRegister from './component/MailRegister'

import AuthUser from '../AuthUser/AuthUser'




const handleSidebarToggle = () => {
  const sidebar = document.querySelector('.sidebar');
  const sidebarBtn = document.querySelector('.sidebarBtn');

  sidebar.classList.toggle('active');
  if (sidebar.classList.contains('active')) {
    sidebarBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
  } else sidebarBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
};

const RedesignedAdminDashboard = () => {
  const { token, logout } = AuthUser();
  const logoutAdmin = () => {
      if (token != undefined) {
          logout();
      }
  }
  return (
    <div>
<div class="sidebar">
      <div class="logo-details">
        <i class="bx bxl-c-plus-plus"></i>
        <span class="logo_name">Milk Dairy</span>
      </div>
      <ul class="nav-links">
        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <NavLink to='/dashboard'>  
                <a href="#">
                    <span class="links_name">Farmer</span>
                </a>   
            </NavLink>
          </a>
        </li>


        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <NavLink to='/record'>  
                <a href="#">
                    <span class="links_name">Collection Record</span>
                </a>   
            </NavLink>
          </a>
        </li>


        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <NavLink to='/register'>  
                <a href="#">
                    <span class="links_name">Register</span>
                </a>   
            </NavLink>
          </a>
        </li>


        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <NavLink to='/inventory'>  
                <a href="#">
                    <span class="links_name">Inventory</span>
                </a>   
            </NavLink>
          </a>
        </li>


        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <NavLink to='/userOrder'>  
                <a href="#">
                    <span class="links_name">Users</span>
                </a>   
            </NavLink>
          </a>
        </li>

        <li>
          <a href="#" class="active">
            <i class="bx bx-grid-alt"></i>
            <NavLink to='/mailRegister'>  
                <a href="#">
                    <span class="links_name">Mail Registration</span>
                </a>   
            </NavLink>
          </a>
        </li>


  

        <li class="log_out">
          <a href="#">
            <i class="bx bx-log-out"></i>
            <span class="links_name" onClick={logoutAdmin}>Log out</span>
          </a>
        </li>
        


      </ul>
    </div>



    <section class="home-section">
      <nav>
        <div class="sidebar-button">
        <i className="bx bx-menu sidebarBtn" style={{ cursor: 'pointer' }} onClick={handleSidebarToggle}></i>
          <span class="dashboard" >Dashboard</span>
        </div>

        
      </nav>

      <div class="home-content">
               <Routes>
                    <Route path="/dashboard" element={<Farmer />} />
                    <Route path="/record" element={<DeliveryRecord />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/userOrder" element={<UserOrder />} />
                    <Route path="/mailRegister" element={<MailRegister />} />
                </Routes>
      </div>
    </section>

    </div>
  )
}

export default RedesignedAdminDashboard