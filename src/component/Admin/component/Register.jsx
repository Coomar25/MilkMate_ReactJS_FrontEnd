import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser/AuthUser';









const Register = () => {


    const navigate = useNavigate();
    const { http } = AuthUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = () => {
        http.post('/register', {
            email,
            password,
            name,
            password_confirmation: passwordConfirmation,
            address,
            contact,
        }).then((response) => {
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            setAddress('');
            setContact('');
            navigate('/dashboard');
            alert(response.data.message);
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'password_confirmation':
                setPasswordConfirmation(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'contact':
                setContact(value);
                break;
            default:
                break;
        }
    };







    return (
        <div className='registerform'>
            <h1 className='mt-4 mb-4'>Register User</h1>
            <div className='mb-3 row'>
                <label className='col-sm-3 col-form-label'>Name</label>
                <div className='col-md-12'>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-3 col-form-label'>Email</label>
                <div className='col-sm-12'>
                    <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-3 col-form-label'>Password</label>
                <div className='col-sm-12'>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-3 col-form-label'>Confirm Password</label>
                <div className='col-sm-12'>
                    <input
                        type='password'
                        name='password_confirmation'
                        value={passwordConfirmation}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-3 col-form-label'>Contact</label>
                <div className='col-sm-12'>
                    <input
                        type='tel'
                        name='contact'
                        value={contact}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-3 col-form-label'>Address</label>
                <div className='col-sm-12'>
                    <input
                        type='tel'
                        name='address'
                        value={address}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary">Register</button>


        </div>
    )
}

export default Register