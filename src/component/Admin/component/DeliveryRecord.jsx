import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser/AuthUser';
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { useEffect } from 'react';
import axios from 'axios';
import AdminLoadingSection from './AdminLoadingSection'

const DeliveryRecord = () => {

    const [date, setDate] = useState("");   //Nepali Calender
    const navigate = useNavigate();
    const { http, token } = AuthUser();
    const [userId, setUserId] = useState('');
    const [fat, setFat] = useState('');
    const [litre, setLitre] = useState('');
    // const [deliveryDate, setDeliveryDate] = useState('');
    const [statement, setStatement] = useState();

    //For Loading
    const [isLoading, setIsLoading] = useState(true);


    const handleSubmit = (event) => {
        event.preventDefault();
        http.post(`/storeDelivery?token=${token}`, {
            user_id: userId,
            fat,
            litre,
            // date: deliveryDate,
            date: date
        }).then((response) => {
            navigate('/record');
            setUserId('');
            setFat('');
            setLitre('');
            // setDeliveryDate('');
            window.location.reload();
            alert(response.data.message);
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'userId':
                setUserId(value);
                break;
            case 'fat':
                setFat(value);
                break;
            case 'litre':
                setLitre(value);
                break;
            // case 'deliveryDate':
            //     setDeliveryDate(value);
            //     break;
            default:
                break;
        }
    };



    // const handleDate = ({ bsDate, adDate }) => {
    //     setDate({ date: bsDate });
    // };

    const handleDate = ({ bsDate }) => {
        setDate({ bsDate });
    };




    useEffect(() => {
        axios.get(`http://localhost:8000/api/farmerDeliveredStatement`).then(response => {
            const parsedRecordStatement = response.data.statement;
            setIsLoading(false);
            const mergedData = parsedRecordStatement.map(overallstatement => {
                return {
                    user_id: overallstatement.user_id,
                    farmername: overallstatement.farmername,
                    fat: overallstatement.fat,
                    litre: overallstatement.litre,
                    date: overallstatement.date,
                    price: overallstatement.price
                }
            });
            setStatement(mergedData);
        }).catch(error => {
            alert(error.message || "Token Expired Please Relogin");
            console.error(error);
        });
    }, []);

    if (isLoading) {
        return <AdminLoadingSection />
    }



    return (
        <div className="deliveryRecord">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">User ID</label>
                        <input
                            type="number"
                            value={userId}
                            name="userId"
                            onChange={handleChange}
                            className="form-control is-valid"
                            required
                        />
                        {/* <div className="valid-feedback">Looks good!</div> */}
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Fat</label>
                        <input
                            type="number"
                            value={fat}
                            name="fat"
                            onChange={handleChange}
                            className="form-control is-valid"
                            required
                        />
                        {/* <div className="valid-feedback">Looks good!</div> */}
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Litre</label>
                        <input
                            type="number"
                            value={litre}
                            name="litre"
                            onChange={handleChange}
                            className="form-control is-valid"
                            required
                        />
                        {/* <div className="valid-feedback">Looks good!</div> */}
                    </div>
                    {/* <div className="col-md-4">
                        <label className="form-label">Delivery Date</label>
                        <input
                            type="text"
                            value={deliveryDate}
                            name="deliveryDate"
                            onChange={handleChange}
                            className="form-control is-valid"
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div> */}

                    <div className="row g-1">
                        <div className="col-md-12">
                            <div style={{ pointerEvents: "none" }}>
                                <Calendar onChange={handleDate} value={date} name="date" language="ne" theme="deepdark" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        Submit form
                    </button>
                </div>
            </form>


            <div className='deliveryStatementAdmin'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>User_ID</th>
                            <th scope='col'>Farmer Name</th>
                            <th scope='col'>Fat</th>
                            <th scope='col'>Litre</th>
                            <th scope='col'>Date</th>
                            <th scope='col'> Price</th>
                        </tr>
                    </thead>
                    <thead>
                        {statement && statement.map(overallstatement => (
                            <tr key={overallstatement.user_id}>
                                <th scope='col'>{overallstatement.user_id}</th>
                                <th scope='col'>{overallstatement.farmername}</th>
                                <th scope='col'>{overallstatement.fat}</th>
                                <th scope='col'>{overallstatement.litre}</th>
                                <th scope='col'>{overallstatement.date}</th>
                                <th scope='col'>Nrs. {overallstatement.price} /-</th>
                            </tr>
                        ))}
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default DeliveryRecord;
