// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification, signOut, updatePassword, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import toast from "react-hot-toast";
const firebaseConfig = {
  apiKey: "AIzaSyD2cphS7MbvFQZq7JSIcTDAB-XpfxzN9Ss",
  authDomain: "asgo-19243.firebaseapp.com",
  projectId: "asgo-19243",
  storageBucket: "asgo-19243.appspot.com",
  messagingSenderId: "377604451753",
  appId: "1:377604451753:web:453763aea514eea198e8b8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const actionCodeSettings = {
//   url: 'https://your-website.com/password-reset',
//   handleCodeInApp: true,
// };
export const logout = async () => {
 await signOut(auth)
    .then(() => {
      toast.success("Logged out");
    })
    .catch(() => {
      toast.error("Logout failed. Please try again.");
    });
};
export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Password Updated!");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `${auth.currentUser.email} adresine dogrulama maili gonderildi`
    );
  } catch (error) {
    toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile Updated");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
// export const resetPassword = async (oldPassword, newPassword) => {
//   try {
//     const user = auth.currentUser;
    
//     // Kullanıcının mevcut şifresini doğrula
//     const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
//     await user.reauthenticateWithCredential(credential);
    
//     // Yeni şifreyi ayarla
//     await user.updatePassword(newPassword);

//     toast.success("Password Updated!");
//     return true;
//   } catch (error) {
//     toast.error(error.message);
//     return false;
//   }
// };






export default app;
