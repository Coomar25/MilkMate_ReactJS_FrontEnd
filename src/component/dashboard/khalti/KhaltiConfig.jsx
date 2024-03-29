import myKey from './KhaltiKey'
// import { AppState } from '../Order'
// import { useContext } from 'react';
import axios from 'axios';
// import AuthUser from '../../AuthUser/AuthUser';


// const {user} = AuthUser()
// const userID = user.id;
// console.log(userID);
let config = {
    "publicKey": myKey.publicTestKey,
    // "productName": "product 1",
    // "description": "Description here",
    // "quantity": "quantity here",
    // "productIdentity": "1234567890",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            let data = {
                "token": payload.token,
                "amount": payload.amount,
            };
            let config = {
                headers: { 'Authorization': myKey.secretKey }
            };
            axios.post("http://localhost:8000/api/khalticheckout", payload, config).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
        },
        // onError handler is optional
        onError(error) {
            // handle errors
            console.log(error);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;




// import { useContext } from 'react';
// import myKey from './KhaltiKey';
// import { AppState } from '../Order';

// const KhaltiConfig = () => {
//     const appData = useContext(AppState);

//     let config = {
//         publicKey: myKey.publicTestKey,
//         productIdentity: "1234567890",
//         productName: "Drogon",
//         productUrl: "http://gameofthrones.com/buy/Dragons",
//         eventHandler: {
//             onSuccess(payload) {
//                 // hit merchant api for initiating verification
//                 console.log(payload);
//             },
//             onError(error) {
//                 // handle errors
//                 console.log(error);
//             },
//             onClose() {
//                 console.log('widget is closing');
//             }
//         },
//         paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
//     };

//     return config;
// };

// export default KhaltiConfig;
