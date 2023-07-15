"use client"
import Link from "next/link";
import React, { FormEvent, useContext } from "react";
import { useState} from "react";
import { useRouter } from "next/router";
import { UserInterface, Authentication } from "../../interfaces/user";
import { AllUsersContext } from "../../context/allusers";



const LoginComponent = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [datares, setDatares] = useState<UserInterface[]>([])

  const allUserContext = useContext(AllUsersContext)
  const handleLogin = async (formSubmit: FormEvent<HTMLFormElement>) => {
    formSubmit.preventDefault();



    const fd = new FormData(formSubmit.currentTarget);
    var object: any = {};
    fd.forEach(function (value, key) {
      object[key] = value;
    });

    console.log('====================================');
    console.log(object, 'obj');
    console.log('====================================');
    console.log('====================================');
    console.log(`Basic ${btoa(`${object.username}:${object.password}`)}`);
    console.log(`Basic ${Buffer.from(`${object.username}:${object.password}`).toString('base64')}`
    )
    console.log('====================================');
    console.log(`${object.username}:${object.password}`, 'try');


    try {
      const response = await fetch('/api/allusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object)
      });
      const data = await response.json();
      setDatares(data);
      console.log('====================================');
      console.log(datares, 'data');
      console.log('====================================');
      localStorage.setItem("allUsers", JSON.stringify(data as UserInterface[]))
      console.log(localStorage)
      allUserContext.update(data as UserInterface[])
      let filterData = (data as UserInterface[]).filter((user) => user.email == object.username)
      console.log('====================================');
      console.log(filterData, object, object.username, "filterData");
      console.log('====================================');
      if (filterData.length > 0) {
        alert('Login successful!');
        let authData: Authentication = {
          auth: object,
          id: filterData[0].id,
          userName: filterData[0].username
        }
        localStorage.setItem('user', JSON.stringify(authData));
        router.push("/");
      } else {
        alert('User not found!');
      }
    } catch (error) {
      console.log(error, 'logintsx error');
    }
     

  }
  return <section className="ftco-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="wrap mt-4">
            <div className="login-wrap mt-4 p-4 p-md-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-2 text-center">Welcome Back</h3>
                </div>
              </div>
              <form action="#" className="signin-form" onSubmit={handleLogin}>
                <div className="form-group mt-4">
                  <input type="text" className="form-control rounded-pill input-area" name="username" placeholder="Username"
                    value={username} onChange={(e) => setUserName(e.target.value)}
                    required />
                </div>
                <div className="form-group mt-4">
                  <input type="password" className="form-control rounded-pill input-area" name="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="form-control btn btn-primary btn-teal rounded-pill submit px-3">Sign In</button>
                </div>
                <div className="form-group d-md-flex mt-3">
                  <div className="text-end w-100">
                    <a href="#" className="fw-bold txt-link">Forgot Password?</a>
                  </div>
                </div>
              </form>
              <p className="text-center mt-4">Don&apos;t have an account? <Link data-toggle="tab" href="/signup" className="fw-bold txt-link">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default LoginComponent

