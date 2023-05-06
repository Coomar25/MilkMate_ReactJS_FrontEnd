
import React, { useState } from 'react';
import axios from 'axios';
import AuthUser from '../AuthUser/AuthUser';


const ForgotPasswordLink = () => {
    const { http } = AuthUser();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        http.post('forgetpassword', { email: email })
            .then((response) => {
                console.log(response.data.message);
                alert(response.data.message);
                setEmail('');
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <div> Wait until the message got sent</div>
    }



    return (


        <div className="container ">
            <div className="loginContainer">

                <form>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">

                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" >Email address</label>
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary btn-block mb-4" type="submit"> Reset </button>


                </form>
            </div>
        </div>


    );
};

export default ForgotPasswordLink;


