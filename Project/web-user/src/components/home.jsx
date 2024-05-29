import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStudent from "./addStudent";
import EditStudent from "./editStudent";
import Students from "./students";

const getCurrentTime = () => new Date().toLocaleTimeString();

const Home = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) ?? {});
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [studentId, setStudentId] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login');
        }

        return(() => {
            console.log("Unmounting");
        });
    });

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    }

    const clientDataChanged = useCallback( () => {
        setCurrentTime(getCurrentTime());
    });
    
    const studentToEdit = useCallback( (id) => {
        setStudentId(id);
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Avakash Technocorp</span>
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
                            <h5>Student</h5>
                            <ul class="list-unstyled components mb-5">
                            <li>Student</li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="col-8">
                    <AddStudent dataChanged = {clientDataChanged}></AddStudent>
                    <EditStudent studentId={studentId} dataChanged = {clientDataChanged}></EditStudent>
                    <Students updateTime={currentTime} dataChanged = {clientDataChanged} studentToEdit={studentToEdit}></Students>
                </div>
            </div>
        </div>
    );
}

export default Home;