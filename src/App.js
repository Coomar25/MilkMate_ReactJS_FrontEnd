
import {
    BrowserRouter as Router,
    // Routes,
    // Route,
} from "react-router-dom";
import Authentication from "./component/navbar/Authentication";
// import AdminDashboard from "./component/Admin/AdminDashboard";
import './App.css';


function App() {
    return (
        <div className="App">
            <Router>
                <Authentication />
            </Router >
        </div>
    );

}

export default App;