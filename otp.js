// Import the functions you need from the SDKs you need
const auth = getAuth(app);

const verify = document.getElementById('verify');
verify.addEventListener("click", function (event){
  event.preventDefault();

  const code = document.getElementById('otp').value;
  
  if (window.confirmationResult) {
    window.confirmationResult.confirm(code).then(() => {
      // User signed in successfully.
      
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
