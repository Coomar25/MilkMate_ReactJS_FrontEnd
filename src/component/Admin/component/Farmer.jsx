import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AuthUser from '../../AuthUser/AuthUser'
import AdminLoadingSection from './AdminLoadingSection'

const Farmer = () => {
    const { token } = AuthUser();
    const [farmersData, setFarmersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/totalFarmers?token=${token}`).then(response => {
            const parsedFarmerData = response.data.farmersData;
            setIsLoading(false);
            const addInfo = response.data.addInfo;
            const mergedData = parsedFarmerData.map(farmer => {
                const matchingAddInfo = addInfo.find(add => add.id === farmer.id);
                return { ...farmer, ...matchingAddInfo };
            });

            setFarmersData(mergedData);
        }).catch(error => console.error(error));
    }, []);

    if (isLoading) {
        return <AdminLoadingSection />
    }

    return (
        <div className='farmertable'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {farmersData && farmersData.map(farmer => (
                        <tr key={farmer.id}>
                            <td>{farmer.id}</td>
                            <td>{farmer.name}</td>
                            <td>{farmer.email}</td>
                            <td>{farmer.created_at}</td>
                            <td>{farmer.contact}</td>
                            <td>{farmer.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Farmer;
