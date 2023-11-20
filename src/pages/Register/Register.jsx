import React from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../../Firebase.config";
import { storage } from "../../Firebase.config";
import { db } from "../../Firebase.config";
import toast from "react-hot-toast";
import useAuth from "../../custom-hooks/useAuth";
import profile from "../../assets/profile.png";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${username}_${Date.now()}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // user profili guncellemesi
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            // store user data in firestore database
            await setDoc(doc(db, "Users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      navigate("/login");
      toast.success("Registration successful");
    } catch (error) {
      setLoading(false);
      toast.error(
        "Registration failed. Please check your information and try again."
      );
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
              <h3>Register</h3>
              <form className="auth-form" onSubmit={signUp}>
                <div>
                  <img
                    src={currentUser ? currentUser.photoURL : profile}
                    width={100}
                    height={100}
                    className="rounded-circle object-fit-cover"
                    alt=""
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="custom-file-input"
                  />
                </div>
                <div className="login-btn-div">
                  <button disabled={!email}>Create an Account</button>
                </div>
                <p>
                  Already have an account?
                  <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
