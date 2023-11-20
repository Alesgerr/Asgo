import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase.config";
import { useState } from "react";
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setLoading(false);
      toast.success("Sign in successful");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please check your email and password.");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="col-lg-12 text-center">
              <h5 className="fw-bold">Loading....</h5>
            </div>
          ) : (
            <div id="auth-form" className="col-lg-6">
              <h3>Login</h3>
              <form className="auth-form" onSubmit={signIn}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login-btn-div">
                  <button disabled={!email}>Login</button>
                </div>
                <p>
                  <Link to="/forgotpassword">Forgot Password</Link>
                </p>
                <p>
                  Don't have an account?
                  <Link to="/register">Create an account</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
