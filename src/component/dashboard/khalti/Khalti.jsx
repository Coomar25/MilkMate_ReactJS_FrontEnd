import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './KhaltiConfig';
import Button from '@mui/material/Button';
import AuthUser from '../../AuthUser/AuthUser';



const Khalti = ({ name, price, productid, quantity }) => {
    const {user} =AuthUser();
    let userId = user.id;
    console.log(userId);
    let checkout = new KhaltiCheckout(config);
    const handlePayment = () => {
        checkout.show({
            // amount: 1000, //1000 paisa || 10 rupee samma support garxa
            amount:  price,  // price pani 1000 vanda kaam halne hai jun chai paisa ma hune garxa rupee ma hoena
            productName: name,
            productIdentity: productid,
            quantity: quantity,
            user: userId
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