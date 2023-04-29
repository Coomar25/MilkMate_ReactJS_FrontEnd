// import Login from './user/login/Login'
// import GuestUser from './user/navbar/GuestUser'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
// import AuthUser from './user/AuthUser/AuthUser';



// // below import for the auth user
// import Dashboard from './user/dashboard/Dashboard'
// import Incomestatus from './user/incomestatus/Incomestatus'

// // below import for the guest 
// import GuestDashboard from './user/dashboard/GuestDashboard'
// import UserRegister from './admin/register/UserRegister'
// import AuthenticatedUser from './user/navbar/AuthenticatedUser';


// function App() {


//   const { getToken } = AuthUser();
//   if (!getToken()) {
//     return <GuestUser />
//   } else {
//     return (
//       <AuthenticatedUser />
//     );
//   }

//   // return (
//   //   <div className="App">
//   //     <Router>

//   //       <Routes>
//   //         <Route path="/login" element={<Login />} />
//   //         <Route path="/guest" element={<GuestDashboard />} />

//   //         {/* below routes is for authenticated user */}
//   //         <Route path="/userdashboard" element={<Dashboard />} />
//   //       </Routes>
//   //     </Router >
//   //   </div>
//   // );
// }

// export default App;





import GuestUser from './user/navbar/GuestUser'
import AuthUser from './user/AuthUser/AuthUser';
import AuthenticatedUser from './user/navbar/AuthenticatedUser';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './user/dashboard/Dashboard'


function App() {

  const { getToken } = AuthUser();
  if (!getToken()) {
    return
    <>
      <Router>
        <Routes>
          <GuestUser />
        </Routes>
      </Router >
    </>

  } else {
    return (
      <div className="App">
        <Router>
          <AuthenticatedUser />
          <Routes>
            {/* below routes is for authenticated user */}
            <Route path="/userdashboard" element={<Dashboard />} />
          </Routes>
        </Router >
      </div>
    );
  }
}

export default App;
