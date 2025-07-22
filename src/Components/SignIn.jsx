import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const SignIn = () => {

    const {signInUser} = useContext(AuthContext)

    const handleSignIn = e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(email, password)
        signInUser(email, password)
        .then(result =>{
            console.log(result.user)

            // Update last login time
            const lastSignInTime = result?.user?.metadata?.lastSignInTime
            const loginInfo = {
                email,
                lastSignInTime
            }

            fetch("http://localhost:5000/users", {
                method: "PATCH",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(loginInfo)
            })
            .then(res => res.json())
            .then(data => {
                console.log("sign in info updated in db", data)
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div>
      <form onSubmit={handleSignIn}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign In now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" name="email" className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Sign In</button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    );
};

export default SignIn;