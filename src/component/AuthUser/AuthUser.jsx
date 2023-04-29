import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard'


export default function AuthUser() {

    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const getUtype = () => {
        const utypeString = sessionStorage.getItem('roles');
        const utype_detail = JSON.parse(utypeString);
        return utype_detail;
    }



    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [roles, setRoles] = useState(getUtype());

    // const saveUsertype = (roles) => {
    //     sessionStorage.setItem('roles', JSON.stringify(roles));
    //     setUsertype(roles);
    // }


    const saveToken = (user, token, roles) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('roles', JSON.stringify(roles));
        setToken(token);
        setUser(user);
        setRoles(roles);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return {
        setToken: saveToken,
        // setUsertype: saveUsertype,
        token,
        user,
        getToken,
        http,
        logout,
        roles,
        getUtype
    }
}
