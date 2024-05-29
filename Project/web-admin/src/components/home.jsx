import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Users from "./users";
import EditUser from "./editUser";

const getCurrentTime = () => new Date().toLocaleTimeString();

const Home = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('adminUserData')) ?? {});
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('adminUserData');
        if (!userData) {
            navigate('/login');
        }

        return(() => {
            console.log("Unmounting");
        });
    });

    const handleLogout = () => {
        localStorage.removeItem('adminUserData');
        navigate('/login');
    }

    const clientDataChanged = useCallback( () => {
        setCurrentTime(getCurrentTime());
    });
    
    const userToEdit = useCallback( (id) => {
        setUserId(id);
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Avakash Technocorp</span>
                    <span>Admin Portal</span>
                    <span className="navbar-text ml-auto">
                        Welcome, {userData.firstName}
                    </span>
                    <form className="form-inline navbar-right ml-auto">
                        <button className="btn btn-outline-success my-2 my-sm-0 navbar-right" type="button" onClick={handleLogout}>Logout</button>
                    </form>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <nav id="sidebar">
                        <div class="p-4 pt-5">
                            <h5>Users</h5>
                            <ul class="list-unstyled components mb-5">
                            <li>User</li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="col-8">
                    <EditUser userId={userId} dataChanged = {clientDataChanged}></EditUser>
                    <Users updateTime={currentTime} dataChanged = {clientDataChanged} userToEdit={userToEdit}></Users>
                </div>
            </div>
        </div>
    );
}

export default Home;