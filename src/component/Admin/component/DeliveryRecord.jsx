import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser/AuthUser';
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';

const DeliveryRecord = () => {
    const navigate = useNavigate();

    const { http } = AuthUser();

    const [userId, setUserId] = useState('');
    const [fat, setFat] = useState('');
    const [litre, setLitre] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        http.post('/storeDelivery', {
            user_id: userId,
            fat,
            litre,
            date: deliveryDate,
        }).then((response) => {
            navigate('/record');
            // window.location.reload();
            alert(response.data.message);
            setUserId('');
            setFat('');
            setLitre('');
            setDeliveryDate('');
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
            case 'deliveryDate':
                setDeliveryDate(value);
                break;
            default:
                break;
        }
    };


    const [date, setDate] = useState("");

    const handleDate = ({ bsDate, adDate }) => {
        setDate({ date: bsDate });
    };

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
                        <div className="valid-feedback">Looks good!</div>
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
                        <div className="valid-feedback">Looks good!</div>
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
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    {/* <div className="col-md-4">
                        <label className="form-label">Delivery Date</label>
                        <input
                            type="number"
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
                            <Calendar onChange={handleDate} value={date} name='deliverydate' language="en" theme="deepdark" />
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        Submit form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeliveryRecord;
