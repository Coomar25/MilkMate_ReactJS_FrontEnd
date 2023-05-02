import React from 'react'
import { useState } from "react";


import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import AuthUser from '../../AuthUser/AuthUser';
import { useNavigate } from 'react-router-dom';




const DeliveryRecord = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");

    const handleDate = ({ bsDate, adDate }) => {
        setDate({ date: bsDate });
    };

    const { http } = AuthUser();
    const [userid, setUserid] = useState('');
    const [fat, setFat] = useState('');
    const [litre, setLitre] = useState('');
    const [deliverydate, setDeliverydate] = useState('');

    const handleSubmit = () => {
        http.post('/storeDelivery', {
            user_id: userid,
            fat,
            litre,
            date: deliverydate
        }).then((response) => {
            navigate('/record');
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'userid':
                setUserid(value);
                break;

            case 'fat':
                setFat(value);
                break;
            case 'litre':
                setLitre(value);
                break;
            case 'deliverydate':
                setDeliverydate(value);
                break;

            default:
                break;
        }
    }

    return (
        <div className='deliveryRecord'>
            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">User ID</label>
                    <input type="number" value={userid} name='userid' onChange={handleChange} className="form-control is-valid" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Fat</label>
                    <input type="number" value={fat} name='fat' onChange={handleChange} className="form-control is-valid" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Litre</label>
                    <input type="number" value={litre} name='litre' onChange={handleChange} className="form-control is-valid" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Litre</label>
                    <input type="number" value={deliverydate} name='deliverydate' onChange={handleChange} className="form-control is-valid" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>
            <div className="row g-1">
                {/* <div className="col-md-12">
                    <Calendar onChange={handleDate} value={date} name='deliverydate' language="en" theme="deepdark" />
                </div> */}
            </div>

            <div class="col-12">
                <button className="btn btn-primary" onSubmit={handleSubmit} type="submit">Submit form</button>
            </div>

        </div>
    )
}

export default DeliveryRecord