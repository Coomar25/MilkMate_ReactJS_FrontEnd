import React from 'react'

const Main = () => {
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
                                        <p>5000</p>
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
                                        <p>5000</p>
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
                                        <p>50000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




            </main>
        </div>
    )
}

export default Main