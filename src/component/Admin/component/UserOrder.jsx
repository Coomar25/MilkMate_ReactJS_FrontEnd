import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthUser from '../../AuthUser/AuthUser';

const UserOrder = () => {
    const { token } = AuthUser();
    const [farmersOrderData, setFarmersOrderData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/farmersOrderRecord?token=${token}`).then(response => {
            const parsedFarmerOrder = response.data.farmerOrderRecord;

            const mergedData = parsedFarmerOrder.map(order => {
                return {
                    user_id: order.user_id,
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    created_at: order.created_at
                };
            });
            setFarmersOrderData(mergedData);
        }).catch(error => console.error(error));
    }, []);

    return (
        <div className='farmertable'>
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
                <tbody>
                    {farmersOrderData.map(order => (
                        <tr key={order.user_id}>
                            <td>{order.user_id}</td>
                            <td>{order.name}</td>
                            <td>{order.price}</td>
                            <td>{order.quantity}</td>
                            <td>{order.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserOrder;
