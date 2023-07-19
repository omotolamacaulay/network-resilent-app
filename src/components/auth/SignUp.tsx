import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../styles/login.scss";
import { auth } from "../../firebase";
import "../../App.css";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [inputType, setInputType] = useState("password");
  const togglePassword = () => {
    if (inputType === "password") {
      setInputType("text");
      return;
    }
    setInputType("password");
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <div className="login__grid">
        <div className="login__form">
          <h1 className="login-h1">Welcome!</h1>
          <p className="login-p">Enter details to Sign Up.</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type={inputType}
                name="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={onChange}
              />
              <small className="small" onClick={togglePassword}>
                {inputType === "password" ? "Show" : "Hide"}
              </small>
            </div>
            <div className="alternateCTA">
              Already have an account?
              <Link to="/login" className="">
                Log in
              </Link>
            </div>
            <button className="submit" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
