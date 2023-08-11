import React, { useState } from 'react'
import './login.css'
import AuthUser from '../AuthUser/AuthUser'
import { Link } from 'react-router-dom';


const Login = () => {

    const { http, setToken, setUsertype } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const submitForm = () => {
        http.post('/login', { email: email, password: password }).then((res) => {
            setToken(res.data.user, res.data.access_token, res.data.user.utype);
        }).catch((error) => {
            alert('Invalid Login and Password');
        });
    }

    return (
        <div className='lgnPageindex'>
            <h1 className='pt-4 text-primary loginTitle '>Login Here</h1>
            <div className="container ">
                <div className="loginContainer">
                    <form>
                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" />
                            <label className="form-label" >Email address</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <input type="password" onChange={e => setPassword(e.target.value)} className="form-control" />
                            <label className="form-label" >Password</label>
                        </div>

                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                </div>
                            </div>

                            <div className="col">
                                {/* <a href="#!">Forgot password?</a> */}
                                <Link to='/forgetpassword'> Forget Password</Link>
                            </div>
                        </div>

                        <button type="button" onClick={submitForm} className="btn btn-primary btn-block mb-4">Sign in</button>


                    </form>

                </div>


            </div>


            {/* <div class="container-fluid container">
                <div className="container">
                    <Routes>
                        <Route path="/forgetpassword" element={<ForgotPasswordLink />} />
                    </Routes>
                </div>
            </div> */}

        </div>
    )
}

export default Login