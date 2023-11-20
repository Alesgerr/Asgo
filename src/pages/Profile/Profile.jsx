import { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import useAuth from "../../custom-hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  auth,
  storage,
  resetPassword,
  logout,
  emailVerification,
  update,
} from "../../Firebase.config";
import { CircularProgress } from "@mui/material";
import "./Profile.css";
import profile from "../../assets/profile.png";
import toast from "react-hot-toast";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
const Profile = () => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  // const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const navigate = useNavigate()
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async () => {
    if (file) {
      setLoading(true);
      // Yeni fotoğrafı Firebase Storage'a yükle
      // const storageRef = ref(storage, `images/${currentUser.displayName}`);
      const storageRef = ref(
        storage,
        `images/${currentUser.displayName}_${Date.now()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask;
        const url = await getDownloadURL(storageRef);
        // Kullanıcı profiline yeni fotoğrafı ekle
        await updateProfile(auth.currentUser, {
          photoURL: url,
        });

        setLoading(false);
        window.location.reload();
      } catch (error) {
        console.error("Fotoğraf yükleme hatası: ", error);
      }
    }
  };
  const logoutHandle = async () => {
    await logout();
    navigate('/login')
  };
  const handleResetSumbit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
      setOpen1(false)
    }
  };
  const handleEmailVerification = async () => {
    await emailVerification();
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
    });
    setOpen(false)
    setOpen1(false)

  };
  return (
    <div className="user-profile container">
      <h1 className="mx-auto text-center mt-4">Profile Page</h1>

      {currentUser ? (
        <div className="row">
          <div className="col-lg-4">
            <div className="profile-info1 mt-4">
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button onClick={handleProfileUpdate}>Fotoğrafı Güncelle</button> */}
              <div className="prof-img-box">
                <label htmlFor="fileInput" className="custom-file-upload">
                  <img
                    src={currentUser ? currentUser.photoURL : profile}
                    alt=""
                    className="profile-image"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <button
                className="user-prof-btn"
                onClick={handleProfileUpdate}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Photo Update"
                )}
              </button>
              <div className="user-details">
                <h2>{currentUser.displayName}</h2>
                <p>{currentUser.email}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="profile-info2 mt-4">
              <div className="prof-box2">
                <div className="prof-box-d">
                  <div className="user-verification">
                    <h5>Verification</h5>
                    {currentUser?.emailVerified ? (
                      <RiVerifiedBadgeFill className="prof-badge" />
                    ) : (
                      <MdCancel className="prof-badge" />
                    )}
                  </div>
                  {currentUser?.emailVerified ? (
                    ""
                  ) : (
                    <button
                      className="prof-btn"
                      onClick={handleEmailVerification}
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
              <div className="prof-box">
                <div className="prof-box-d">
                  <h5>Change Username</h5>
                  <div>
                    <Button
                      variant="outlined"
                      color="neutral"
                      className="prof-btn"
                      onClick={() => setOpen(true)}
                    >
                      Change
                    </Button>
                    <Modal
                      aria-labelledby="modal-title"
                      aria-describedby="modal-desc"
                      open={open}
                      onClose={() => setOpen(false)}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Sheet
                        variant="outlined"
                        sx={{
                          maxWidth: 500,
                          borderRadius: "md",
                          p: 3,
                          boxShadow: "lg",
                        }}
                      >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography
                          component="h2"
                          id="modal-title"
                          level="h4"
                          textColor="inherit"
                          fontWeight="lg"
                          mb={1}
                        >
                          Change Username
                        </Typography>
                        <Typography id="modal-desc" textColor="text.tertiary">
                          {/* Make sure to use <code>aria-labelledby</code> on the
                          modal dialog with an optional{" "}
                          <code>aria-describedby</code> attribute. */}
                        </Typography>

                        <form onSubmit={handleSumbit}>
                          <Input
                            placeholder="Username..."
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                          />
                          <div className="d-flex justify-content-between">
                            <Button
                              className="mt-2 modal-hide-btn"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </Button>
                            <button
                              disabled={!displayName}
                              className="mt-2 reset-pass-btn text-white"
                            >
                              Update Username
                            </button>
                          </div>
                        </form>
                      </Sheet>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="prof-box">
                <div className="prof-box-d">
                  <h5>Change Password</h5>
                  {currentUser?.emailVerified ? (
                    <div>
                      <Button
                        variant="outlined"
                        color="neutral"
                        className="prof-btn"
                        onClick={() => setOpen1(true)}
                      >
                        Change
                      </Button>
                      <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={open1}
                        onClose={() => setOpen1(false)}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Sheet
                          variant="outlined"
                          sx={{
                            maxWidth: 500,
                            borderRadius: "md",
                            p: 3,
                            boxShadow: "lg",
                          }}
                        >
                          <ModalClose variant="plain" sx={{ m: 1 }} />
                          <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                          >
                            Reset Password
                          </Typography>
                          {/* <Typography id="modal-desc" textColor="text.tertiary">
                          Make sure to use <code>aria-labelledby</code> on the
                          modal dialog with an optional{" "}
                          <code>aria-describedby</code> attribute.
                        </Typography> */}

                          <form onSubmit={handleResetSumbit}>
                            <Input
                              placeholder="Password..."
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="d-flex justify-content-between">
                              <Button
                                className="mt-2 modal-hide-btn"
                                onClick={() => setOpen1(false)}
                              >
                                Cancel
                              </Button>
                              <button
                                disabled={!password}
                                className="mt-2 reset-pass-btn text-white"
                              >
                                Reset Password
                              </button>
                            </div>
                          </form>
                        </Sheet>
                      </Modal>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        color="neutral"
                        className="prof-btn"
                        onClick={() => setOpen1(true)}
                      >
                        Change
                      </Button>
                      <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={open1}
                        onClose={() => setOpen1(false)}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Sheet
                          variant="outlined"
                          sx={{
                            maxWidth: 500,
                            borderRadius: "md",
                            p: 3,
                            boxShadow: "lg",
                          }}
                        >
                          <ModalClose variant="plain" sx={{ m: 1 }} />
                          <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                          >
                            Email Verification
                          </Typography>
                          <Typography id="modal-desc" textColor="text.tertiary">
                            Please verify your email before resetting your
                            password
                          </Typography>

                          <div>
                            <div className="d-flex justify-content-between">
                              <Button
                                className="mt-2 modal-hide-btn"
                                onClick={() => setOpen1(false)}
                              >
                                Cancel
                              </Button>
                              <button
                                className="mt-2 reset-pass-btn text-white"
                                onClick={emailVerification}
                              >
                                Verify
                              </button>
                            </div>
                          </div>
                        </Sheet>
                      </Modal>
                    </div>
                  )}
                </div>
              </div>
              <div className="prof-box">
                <div className="prof-box-d">
                  <h5>Logout</h5>
                  <Button
                    variant="outlined"
                    color="neutral"
                    className="prof-btn"
                    onClick={() => setOpen3(true)}
                  >
                    Logout
                  </Button>
                  <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open3}
                    onClose={() => setOpen3(false)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Sheet
                      variant="outlined"
                      sx={{
                        maxWidth: 500,
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                      }}
                    >
                      <ModalClose variant="plain" sx={{ m: 1 }} />
                      <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                      >
                        Logout
                      </Typography>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        Do you really want to make an exit?
                      </Typography>

                      <form onSubmit={handleSumbit}>
                        <div className="d-flex justify-content-between">
                          <Button
                            className="mt-2 modal-hide-btn"
                            onClick={() => setOpen3(false)}
                          >
                            Cancel
                          </Button>
                          <button
                            onClick={logoutHandle}
                            className="mt-2 reset-pass-btn text-white"
                          >
                            Yes
                          </button>
                        </div>
                      </form>
                    </Sheet>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Profile;
