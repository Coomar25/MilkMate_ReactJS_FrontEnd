import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthUser from '../AuthUser/AuthUser';
import Loading from './Loading';

const Analytics = () => {

    const { token } = AuthUser();
    const [individualFarmerOrders, setindividualFarmerOrders] = useState([]);
    const [totalPriceQuantity, setTotalPriceQuantity] = useState([]);

    //For Loding Icon
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/individualFarmerOrders?token=${token}`).then(response => {
            const parsedFarmerOrder = response.data.indivudualOrder;
            setIsLoading(false);
            const orderStatement = response.data;
            const mergedData = parsedFarmerOrder.map(order => {
                return {
                    user_id: order.user_id,
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    expenditure: order.expenditure,
                    created_at: order.created_at,
                    status: order.status
                }
            });
            console.log(individualFarmerOrders);
            setindividualFarmerOrders(mergedData);
            setTotalPriceQuantity(orderStatement);
        }).catch(error => {
            setIsLoading(false);
            console.error(error);
        });
    }, []);


    if (isLoading) {
        return <div>
            <Loading />
        </div>;
    }

    return (
        <div className='farmerOrderTable'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>User_ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Ordered Date</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Expenditure</th>
                        <th scope='col'>Status</th>
                    </tr>
                </thead>
                <thead>
                    {individualFarmerOrders && individualFarmerOrders.map(order => (
                        <tr key={order.user_id}>
                            <th scope='col'> {order.user_id}</th>
                            <th scope='col'>{order.name}</th>
                            <th scope='col'>{order.created_at}</th>
                            <th scope='col'>{order.price}</th>
                            <th scope='col'>{order.quantity}</th>
                            <th scope='col'>{order.expenditure}</th>
                            <th scope='col'>{order.status}</th>
                        </tr>
                    ))}
                </thead>

                <thead>
                    <tr text-color='red'>
                        <th colSpan={3} className='text-center'>Total Order Statement</th>
                        <th scope='col'>{totalPriceQuantity.individualOrderTotalPrice}</th>
                        <th scope='col'>{totalPriceQuantity.individualOrderTotalQuantity}</th>
                        <th scope='col'>{totalPriceQuantity.individualOrderTotalExpenditure}</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default Analytics