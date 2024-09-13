import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { update ,ref ,getDatabase } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyCQqF1yv1Bvodhv2oacOswdtu7aXsV4MJY",
  authDomain: "donation-management-syst-87f76.firebaseapp.com",
  projectId: "donation-management-syst-87f76",
  storageBucket: "donation-management-syst-87f76.appspot.com",
  messagingSenderId: "724531353078",
  appId: "1:724531353078:web:53270112df37609f1623d7",
  measurementId: "G-QK39GGVPZM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", ()=>{
  //Code to check if the user has entered the right credentials
  let email = document.getElementById("usernameInp").value
  let password = document.getElementById("passwordInp").value

  let emailData=localStorage.getItem("email")
  let passwordData=localStorage.getItem("password")

  
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    // console.log("User logged in")
    let date = new Date()

    update(ref(database , 'users/' + user.uid),{
      last_login : date
    })
    //open website
    let email = document.getElementById("usernameInp").value;
    localStorage.setItem("loginEmailId",email);
    window.location.replace("https://m-abhiram.github.io/donation-management-system/");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Your email or password is wrong!!")
  });

});
