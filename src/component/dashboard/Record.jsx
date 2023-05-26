
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import AuthUser from '../AuthUser/AuthUser';
import Loading from './Loading';

function DeliveryTable() {
    const { user, token } = AuthUser();
    const userId = user.id;
    const [deliveryRecord, setDeliveryRecord] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [estimateFatLitrePrice, setEstimateFatLitrePrice] = useState([]);

    useEffect(() => {
        // axios.get(`http://localhost:8000/api/farmerDailyRecords/${userId}`)
        axios.get(`http://localhost:8000/api/farmerDailyRecords?token=${token}`)
            .then(res => {
                setDeliveryRecord(res.data.deliveryrecord);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
                setError(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/estimateFatLitrePrice?token=${token}`).then(res => {
            setEstimateFatLitrePrice(res.data);
            // console.log(res.data);
        }).catch(error => {
            alert(error);
            // console.log(error);
        })
    }, [])


    if (isLoading) {
        return <div>
            <Loading />
        </div>;
    }

    if (error) {
        return <div>Something went wrong: {error.message}</div>;
    }

    return (

        <div>
            <section>

                {/* <!-- Recent Order table --> */}

                <div class="recent-order">
                    <h2>Recent Order</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Supplier Name</th>
                                <th>Date</th>
                                <th>Milk_Litre</th>
                                <th>Milk_Fat</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryRecord.map(record => (
                                <tr key={record.id}>
                                    <td>{record.user_id}</td>
                                    <td>{user.name}</td>
                                    <td>{record.date}</td>
                                    <td>{record.litre} Litre</td>
                                    <td>{record.fat}</td>
                                    <td>{record.price}</td>
                                </tr>
                            ))}
                            <hr />
                        </tbody>
                        <tbody>
                            <tr>
                                <th colSpan={3}> Total Milk Delivery Record Statement Without Expenditure </th>
                                <th>{estimateFatLitrePrice.totalLitre}</th>
                                <th>{estimateFatLitrePrice.totalFat}</th>
                                <th>Nrs. {estimateFatLitrePrice.totalPrice}/-</th>
                            </tr>

                        </tbody>


                    </table>

                </div>
            </section>

        </div>
    );
}

export default DeliveryTable;
