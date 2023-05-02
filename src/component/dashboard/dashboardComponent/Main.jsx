
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [earningStatus, setEarningStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/farmerTotalEarning/1')
            .then(response => {
                const parsedFarmerEarning = response.data.earningFarmer;
                console.log(parsedFarmerEarning);

                const mergedData = {
                    user_id: parsedFarmerEarning.user_id,
                    earning: parsedFarmerEarning.earning,
                    expenditure: parsedFarmerEarning.expenditure,
                    income: parsedFarmerEarning.income,
                    sales: parsedFarmerEarning.sales,
                };

                setEarningStatus(mergedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong: {error.message}</div>;
    }

    return (
        <div>
            <main>
                <h1>Dashboard</h1>
                {/* <!-- This section appear only screen size is 651px --> */}
                <div class="top">
                    <button id="menu-btn">
                        <span class="material-icons-sharp">
                            menu_open
                        </span>
                    </button>
                    <div class="profile">
                        <div class="newinfo">
                            <p>Hey, <b>Kumar</b></p>
                        </div>
                    </div>
                </div>

                {/* <!-- This section appear only screen size is 651px --> */}


                <div class="insight">
                    <div class="sales">
                        <span class="material-icons-sharp">
                            analytics
                        </span>
                        <div class="middle">
                            <div class="left">
                                <h3>Total sales</h3>
                                <h1> Milk Litre</h1>
                            </div>
                            <div class="progressSection">
                                <div class="progress1">
                                    <svg>
                                        <circle cx="38" cy="38" r="50"></circle>
                                    </svg>
                                </div>
                                <div class="progress1 progress2">
                                    <div class="number">
                                        <p>{earningStatus.sales}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="income">
                        <span class="material-icons-sharp">
                            analytics
                        </span>
                        <div class="middle">
                            <div class="left">
                                <h3>Income</h3>
                                <h1> Nrs</h1>
                            </div>
                            <div class="progressSection">
                                <div class="progress1">
                                    <svg>
                                        <circle cx="38" cy="38" r="50"></circle>
                                    </svg>
                                </div>
                                <div class="progress1 progress2">
                                    <div class="number">
                                        <p>{earningStatus.income}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="expenditure">
                        <span class="material-icons-sharp">
                            analytics
                        </span>
                        <div class="middle">
                            <div class="left">
                                <h3>Expenditure</h3>
                                <h1> Nrs</h1>
                            </div>
                            <div class="progressSection">
                                <div class="progress1">
                                    <svg>
                                        <circle cx="38" cy="38" r="50"></circle>
                                    </svg>
                                </div>
                                <div class="progress1 progress2">
                                    <div class="number">
                                        <p>{earningStatus.expenditure}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="expenditure">
                        <span class="material-icons-sharp">
                            analytics
                        </span>
                        <div class="middle">
                            <div class="left">
                                <h3>Total Earning</h3>
                                <h1> Nrs</h1>
                            </div>
                            <div class="progressSection">
                                <div class="progress1">
                                    <svg>
                                        <circle cx="38" cy="38" r="50"></circle>
                                    </svg>
                                </div>
                                <div class="progress1 progress2">
                                    <div class="number">
                                        <p>{earningStatus.earning}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>





            </main>
        </div>
    );
};

export default Main;
