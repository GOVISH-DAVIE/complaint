import React from "react";
import { useState, FormEvent } from "react";
import Link from "next/link";

const SignupComponent = () => {
    const [busy, setbusy] = useState('loading')
    const [password, setPassword] = useState('');
    const [cpassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');


    const handleSubmit = async (submit: FormEvent<HTMLFormElement>) => {
        submit.preventDefault()
        if (password !== cpassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        } else if (password.length < 8 || cpassword.length < 8) {
            setConfirmPasswordError('Password should have a minimum of 8 characters')
            return; 
        }//  else if (password.length >= 8 && cpassword.length >= 8 && password === cpassword){

        // }
       

        if (!/\d.*\d/.test(username)) {
            setUsernameError('Username should contain at least 2 numbers');
            return;
        }
        const formData = { username, email, password }
        console.log(formData, 'fd')
        try {
            const response = fetch('/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            localStorage.setItem('user', JSON.stringify(formData));
            console.log(localStorage, 'reg')
            console.log(response, "data");
            window.location.href = "/login";
            
        } catch (error) {
            console.log(error);
        }
    };

    return <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="wrap mt-4">
                        <div className="login-wrap mt-4 p-4 p-md-5">
                            <div className="d-flex">
                                <div className="w-100">
                                    <h3 className="mb-2 text-center">Create an Account</h3>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="signin-form" action="#" encType="multipart/form-data">
                                <div className="form-group mt-4">
                                    <input type="text" className="form-control rounded-pill input-area" placeholder="Username"
                                        onChange={(e) => setUserName(e.target.value)} required />
                                </div>
                                {usernameError && <p className="text-danger"><small>{usernameError}</small></p>}
                                <div className="form-group mt-4">
                                    <input type="text" value={email} className="form-control rounded-pill input-area" placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group mt-4">
                                    <input id="password-field" type="password" value={password} className="form-control rounded-pill input-area" placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required />
                                </div>
                                <div className="form-group mt-4">
                                    <input id="cpassword-field" type="password" value={cpassword} className="form-control rounded-pill input-area" placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required />
                                </div>
                                {confirmPasswordError && <p className="text-danger"><small>{confirmPasswordError}</small></p>}
                                <div className="form-group mt-4">
                                    <button type="submit" className="form-control btn btn-primary btn-teal rounded-pill submit px-3">Sign Up</button>
                                </div>
                            </form>
                            <p className="text-center mt-4">Already have an account? <Link data-toggle="tab" href="/login" className="fw-bold txt-link">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default SignupComponent;