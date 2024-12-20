import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Store user data temporarily
let tempUserData = null;

async function onSignInSubmit(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store temporary user data
    tempUserData = {
      email,
      phone,
      userId: user.uid
    };

    // Send verification email
    await sendEmailVerification(user);

    // Show verification message
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('verification-message').style.display = 'block';
    document.getElementById('email-display').textContent = email;

  } catch (error) {
    console.error("Error in registration process:", error);
    let errorMessage = "Registration failed. ";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage += "This email is already registered. Please use a different email or try logging in.";
        break;
      case 'auth/invalid-email':
        errorMessage += "Please enter a valid email address.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage += "Email/password accounts are not enabled. Please contact support.";
        break;
      case 'auth/weak-password':
        errorMessage += "Please choose a stronger password (at least 6 characters).";
        break;
      default:
        errorMessage += error.message;
    }
    
    alert(errorMessage);
  }
}

// Check email verification status
function checkVerificationStatus() {
  const user = auth.currentUser;
  if (user) {
    user.reload().then(() => {
      if (user.emailVerified) {
        // Update user profile with phone number
        user.updateProfile({
          phoneNumber: tempUserData.phone
        }).then(() => {
          alert("Email verified successfully! You can now log in.");
          window.location.href = "index.html";
        }).catch((error) => {
          console.error("Error updating profile:", error);
          alert("Email verified, but there was an error updating your profile.");
        });
      } else {
        alert("Please verify your email first. Check your inbox and spam folder.");
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const checkVerificationButton = document.getElementById('check-verification');
  
  if (registerForm) {
    registerForm.addEventListener("submit", onSignInSubmit);
  }
  
  if (checkVerificationButton) {
    checkVerificationButton.addEventListener("click", checkVerificationStatus);
  }
});

