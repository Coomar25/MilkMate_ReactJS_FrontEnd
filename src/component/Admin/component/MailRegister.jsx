import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthUser from '../../AuthUser/AuthUser';
import AdminLoadingSection from './AdminLoadingSection'

const MailRegister = () => {
    const { http, token } = AuthUser();
    const [email, setEmail] = useState('');
    //fOR lOADING
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post('API_URL', { email });
    //         console.log(response.data); // handle the response data
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleSubmit = () => {
        setIsLoading(true); // Set isLoading to true before making the request
        http.post(`registerThroughMail?token=${token}`, {
            email
        }).then((response) => {
            alert(response.data.message);
        }).finally(() => {
            setIsLoading(false); // Set isLoading to false after the request is completed
        });

    }

    if (isLoading) {
        return <AdminLoadingSection />
    }

    return (
        <div className='mailComponent'>
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Email'
                        id='fullWidth'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                    <Button className='mt-4' variant='outlined' type='submit'>
                        Send
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default MailRegister;
