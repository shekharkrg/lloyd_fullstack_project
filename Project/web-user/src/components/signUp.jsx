import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signUpHandler= (e) => {
        e.preventDefault();
        
        const url = 'http://localhost:3300/api/v1/signup';
        const createUser = async (payload) => {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const result = await fetch(url, options);
                if (result.status === 201) {
                    await result.json()
                    .then(data => {
                        console.log(data);
                        navigate('/login');
                    })
                    .catch(error => console.error(error));
                }
                else {
                    console.error(result);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          }
        createUser(body);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Avakash Technocorp</span>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                    <h2>Create a new account</h2>
                    <h3>It's quick and easy</h3>
                    <form onSubmit={signUpHandler} className="mt-100">
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name"/>
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
                        </div>
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign Up</button>
                        <h5>Already Have an account?{' '}
                            <Link to={'/login'}><span>Login</span></Link>
                        </h5>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;