// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDggrd5k_fx2RXEb67Z-8dGwLbSQCqdKgU",
  authDomain: "pipeline-76272.firebaseapp.com",
  projectId: "pipeline-76272",
  storageBucket: "pipeline-76272.firebasestorage.app",
  messagingSenderId: "732061879569",
  appId: "1:732061879569:web:041d0e90d3eb09024e10b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const verify = document.getElementById('verify');
verify.addEventListener("click", function (event){
  event.preventDefault();

  const code = document.getElementById('otp').value;
  
  if (window.confirmationResult) {
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      alert("Phone number verified successfully!");
      window.location.href = "homepage.html";
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert("Error verifying OTP: " + error.message);
    });
  } else {
    alert("No confirmation result found. Please try logging in again.");
    window.location.href = "index.html";
  }
});