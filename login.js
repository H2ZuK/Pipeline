// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Function to handle form submission
async function onLoginSubmit(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in successfully:", user.email);

    // Redirect to homepage or dashboard
    alert("Login successful!");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Error in login process:", error);
    let errorMessage = "Login failed. ";
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage += "No user found with this email. Please check your email or register.";
        break;
      case 'auth/wrong-password':
        errorMessage += "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-email':
        errorMessage += "Please enter a valid email address.";
        break;
      case 'auth/user-disabled':
        errorMessage += "This account has been disabled. Please contact support.";
        break;
      default:
        errorMessage += error.message;
    }
    
    alert(errorMessage);
  }
}

// Set up event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener("submit", onLoginSubmit);
  } else {
    console.error("Login form not found!");
  }
});

