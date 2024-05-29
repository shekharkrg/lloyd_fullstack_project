import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        const url = 'http://localhost:3300/api/v1/admin/login';
        const loginUser = async (payload) => {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const result = await fetch(url, options);
                if (result.status === 200) {
                    toast.success("Login successfull..!!");
                    console.log(result.status);
                    await result.json()
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('adminUserData', JSON.stringify(data));
                        navigate('/home');
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
                else {
                    console.error(result);
                    await result.json().then(err => toast.error(err.error));
                }
            } catch (error) {
                console.error(error.error);
            }
        }

        const body = {
            email: email,
            password: password
          }
          loginUser(body);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Avakash Technocorp</span>
                    <span>Admin Portal</span>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                <div><Toaster/></div>
                </div>
                <div className="col-4">
                    <form onSubmit={loginHandler} className="mt-100">
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
                        </div>
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
                        <h5><Link to={'/signup'}>
                            <span>Create a new Account..!!</span>
                        </Link></h5>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;