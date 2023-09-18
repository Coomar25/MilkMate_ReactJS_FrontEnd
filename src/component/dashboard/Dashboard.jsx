import React from 'react';
import AuthUser from '../AuthUser/AuthUser';
import styles from './css/userdashboard.module.css';

const Dashboard = () => {
  const { user } = AuthUser();

  return (
    <div className={styles.centered}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1>
            <span className={styles.enclosed}>
              <h3>User_ID</h3>
              <p>{user.id}</p>
              <h4>Name</h4>
              <p>{user.name}</p>
              <h4>Email</h4>
              <p>{user.email}</p>
              <p>{user.address}</p>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
