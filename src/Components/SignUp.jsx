import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {

  const {createUser} = useContext(AuthContext)  
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password)

    createUser(email, password)
    .then(result => {
        console.log(result.user)
        const createdAt = result?.user?.metadata?.creationTime
        const newUser = {
            name,
            email,
            createdAt
        }

        // saving user data to mongodb
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert("User created and saved to databse")
            }
        })
    })
    .catch(err =>{
        console.log(err.message)
    })
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSignUp}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign Up now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input type="text" name="name" className="input" placeholder="Email" />
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
                  <button className="btn btn-neutral mt-4">Sign Up</button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
