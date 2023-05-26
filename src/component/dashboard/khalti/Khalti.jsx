import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './KhaltiConfig';
import Button from '@mui/material/Button';


const Khalti = ({ formData }) => {
    let checkout = new KhaltiCheckout(config);
    const handlePayment = () => {
        checkout.show({
            amount: 1000,
        });
    };
    return (
        <div className='mt-4'>
            {/* <Button variant="contained" onClick={() => checkout.show({ amount: 1000 })}>Pay Vai Khalti</Button> */}
            <Button variant="contained" onClick={handlePayment}>Pay Vai Khalti</Button>
        </div>
    )
}

export default Khalti