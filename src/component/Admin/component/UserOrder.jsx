import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthUser from '../../AuthUser/AuthUser';
import AdminLoadingSection from './AdminLoadingSection'


//Material UI
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Button } from '@mui/material';

const UserOrder = () => {
    const { token } = AuthUser();
    const [farmersOrderData, setFarmersOrderData] = useState([]);
    //For Loading Section
    const [isLoading, setIsLoading] = useState(true);
    //select status
    const [selectedstatus, setSelectedStatus] = useState('');

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    }

    const handleStatus = (orderid) => {
        // alert(user_id);
        // alert(selectedstatus);
        axios.post(`http://localhost:8000/api/checkOrderStatus?token=${token}`, {
            status: selectedstatus,
            id: orderid
        }).then(response => {
            console.log(response);
            alert(response.data.message);
            window.location.reload();
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/farmersOrderRecord?token=${token}`).then(response => {

            const parsedFarmerOrder = response.data.farmerOrderRecord;
            setIsLoading(false);
            const mergedData = parsedFarmerOrder.map(order => {
                return {
                    id: order.id,
                    user_id: order.user_id,
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    created_at: order.created_at,
                    status: order.status
                };
            });
            setFarmersOrderData(mergedData);
        }).catch(error => console.error(error));
    }, []);


    if (isLoading) {
        <AdminLoadingSection />
    }


    return (
        <div className='p-4 mt-4'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Order ID</th>
                        <th scope='col'>User_ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Ordered Date</th>
                        <th scope='col'>Manage Status </th>
                        <th scope='col'>Final Status </th>
                    </tr>
                </thead>
                <tbody>
                    {farmersOrderData && farmersOrderData.map(order => (
                        <tr key={order.user_id}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.name}</td>
                            <td>{order.price}</td>
                            <td>{order.quantity}</td>
                            <td>{order.created_at}</td>
                            <td>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Status
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={10}
                                            inputProps={{
                                                name: 'Status',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleStatusChange}
                                        >
                                            <option value={10}>Choose</option>
                                            <option value={"pending"}>Pending</option>
                                            <option value={"completed"}>Completed</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                                <Button className='mt-2' onClick={() => { handleStatus(order.id) }} variant="outlined">Submit</Button>
                            </td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserOrder;
