import { FormEvent, useState } from "react";
import Nav from "../src/components/nav";
import { Authentication, UserInterface } from "../src/interfaces/user";

import { useRouter } from "next/router";

const Profile = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [pass, setNewPass] = useState('')
    const handleSidebarToggle = () => {
        setIsSidebarActive(!isSidebarActive);
    };
    const router = useRouter()
    const userAuth = JSON.parse(localStorage.getItem('user')!) as Authentication;

    const handleUpdatePassword = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const fd = new FormData(ev.currentTarget)

        const uId = userAuth.id;
        const encodedAuth = `${btoa(`${userAuth.auth.username}:${userAuth.auth.password}`)}`
        const username = userAuth.userName;
        const email = userAuth.auth.username;

        console.log('====================================');
        console.log(Object.fromEntries(fd));
        console.log('====================================');
        let mp: any = {}
        mp.password = Object.fromEntries(fd).password
        console.log(mp, 'mp');

        if (Object.fromEntries(fd).password == Object.fromEntries(fd).cpassword) {
            try {
                const response = await fetch(`api/updateprofile/?id=${uId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mp, auth: encodedAuth, uId })
                });
                const data = await response.json();
                alert('password updated')
               

                // const userData = { username, email, password }
                // console.log(userData, 'ud');
                // localStorage.removeItem('user');
                // localStorage.setItem('user', JSON.stringify(userData));
                // console.log(localStorage.getItem('user'), 'user');
                localStorage.clear()
                console.log(localStorage);
                router.push("/login")
            } catch (error) {
                console.log(error, 'profile update error');
                alert('Passwords does not match');
            }
            //     axios.put(`${baseUrl}users/update/${(JSON.parse(localStorage.getItem('user')!) as Authentication).id}`, mp, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth,

            //     }).then(res => {
            //         console.log('====================================');
            //         console.log(res.data);
            //         console.log('====================================');
            //         localStorage.clear()
            //         router.push("/login")
            //     })
            // } else {
            //     alert("Passwords does not match")
            // }

            // axios.post(`${baseUrl}`)
        }
    }

    return <div className="wrapper">
        <Nav option="profile" isSidebarActive={isSidebarActive} />

        <div id="content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button type="button" id="sidebarCollapse" onClick={handleSidebarToggle} className="btn btn-info btn-teal">
                        <i className="fas fa-align-left"></i>
                        <span className="">Menu</span>
                    </button>
                    <div className="">
                        <button role="button" className="form-control btn btn-primary btn-teal rounded-pill submit px-3" data-bs-toggle="modal" data-bs-target="#complaintModal">Post a Complaint</button>
                    </div>
                </div>
            </nav>

            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">User Name: {userAuth?.userName}</h5>
                    <p className="card-text">Email: {userAuth?.auth?.username}</p>
                    <button role="button" className="form-control btn btn-primary btn-teal rounded-pill submit px-3" data-bs-toggle="modal" data-bs-target={`#exampleModal`}>Update Password</button>


                    <div className="modal" id={`exampleModal`} tabIndex={-1} role="dialog" aria-labelledby={`#exampleModal `}>
                        <form onSubmit={handleUpdatePassword} >
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Update Password Form</h5>
                                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input className="form-control" placeholder="New Password" name="password"  />
                                        <br />
                                        <input className="form-control" placeholder="Confirm Password" name="cpassword" />

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger btn-teal btn-sm" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary btn-teal btn-sm">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Profile