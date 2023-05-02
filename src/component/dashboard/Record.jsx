import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Record = () => {

    const [deliveryRecord, setDeliveryRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/farmerDailyRecords/1')
    })
    return (
        <div>
            <section>

                {/* <!-- Recent Order table --> */}

                <div class="recent-order">
                    <h2>Recent Order</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Milk_Litre</th>
                                <th>Milk_Fat</th>
                                <th>Price</th>
                            </tr>

                        </thead>
                        <tbody>

                            <tr>
                                <td>baishak 2</td>
                                <td>3 <span>Litre</span></td>
                                <td>4</td>
                                <td>120</td>
                            </tr>

                            <tr>
                                <td>baishak 2</td>
                                <td>3 <span>Litre</span></td>
                                <td>4</td>
                                <td>120</td>
                            </tr>

                            <tr>
                                <td>baishak 2</td>
                                <td>3 <span>Litre</span></td>
                                <td>4</td>
                                <td>120</td>
                            </tr>


                            <tr>
                                <td>baishak 2</td>
                                <td>3 <span>Litre</span></td>
                                <td>4</td>
                                <td>120</td>
                            </tr>



                        </tbody>
                    </table>

                </div>
            </section>
        </div>
    )
}

export default Record