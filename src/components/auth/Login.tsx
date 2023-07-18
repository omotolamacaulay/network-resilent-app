import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/login.scss";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
    console.log("Login Submitted");
  };
  return (
    <div className="login">
      <div className="login__grid">
        <div className="login__form">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
              <input
                type={inputType}
                name="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={onChange}
              />
              <small onClick={togglePassword}>
                {inputType === "password" ? "Show" : "Hide"}
              </small>
            </div>
            <span>Forgot PASSWORD?</span>
            <div>Don't have an account?</div>
            <Link to="/signup" className="submit">
              Sign up
            </Link>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
