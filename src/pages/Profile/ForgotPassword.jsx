import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
         toast.success("Password reset email sent successfully.");
        // Şifre sıfırlama e-postası başarıyla gönderildi.
      })
      .catch((error) => {
        // Hata oluştu. Error nesnesini kullanarak hatayı işleyebilirsiniz.
        toast.error("An error occurred: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="col-lg-12 text-center mt-5">
              <h5 className="fw-bold">Loading....</h5>
            </div>
          ) : (
            <div id="auth-form" className="col-lg-6">
              <h3>Reset Password</h3>
              <form className="auth-form" onSubmit={resetPassword}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-btn-div">
                  <button disabled={!email}>Reset Password</button>
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

export default ForgotPassword;
