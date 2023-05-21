import React, { useEffect, useState } from 'react'
import axios from 'axios';
import http from '../AuthUser/AuthUser';
import AuthUser from '../AuthUser/AuthUser';

const Analytics = () => {

    const { token } = AuthUser();
    const [individualFarmerOrders, setindividualFarmerOrders] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/individualFarmerOrders?token=${token}`).then(response => {
            const parsedFarmerOrder = response.data.indivudualOrder;
            const mergedData = parsedFarmerOrder.map(order => {
                return {
                    user_id: order.user_id,
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    created_at: order.created_at
                }
            });
            setindividualFarmerOrders(mergedData);
        }).catch(error => console.error(error));
    }, []);



    return (
        <div className='farmerOrderTable'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>User_ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Ordered Date</th>
                    </tr>
                </thead>
                <thead>
                    {individualFarmerOrders && individualFarmerOrders.map(order => (
                        <tr key={order.user_id}>
                            <th scope='col'> {order.user_id}</th>
                            <th scope='col'>{order.name}</th>
                            <th scope='col'>{order.price}</th>
                            <th scope='col'>{order.quantity}</th>
                            <th scope='col'>{order.created_at}</th>
                        </tr>

                    ))}
                </thead>
            </table>
        </div>
    )
}

export default Analytics