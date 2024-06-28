import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth , createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { set ,ref ,getDatabase } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

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
const analytics = getAnalytics(app);
const database = getDatabase(app);
export const auth = getAuth(app)


let signUpButton = document.getElementById("SignUpBtn")
let bool = document.getElementById("Accept")


signUpButton.addEventListener("click",()=>{
  if(document.getElementById("SignUpUsernameInp").value == "" || document.getElementById("SignUpPasswordInp").value == "" || document.getElementById("UsernameInp").value == ""){
    alert("Fill in all the details!")
  }
  if (bool.checked == false){
    alert("Accept the Terms & Conditions to Regiser")
  }
  else{
    //Code to add user to the database
    const auth = getAuth(app);
    let email = document.getElementById("SignUpUsernameInp").value;
    let password = document.getElementById("SignUpPasswordInp").value;
    let username = document.getElementById("UsernameInp").value;
    
    localStorage.setItem("username",username);
    localStorage.setItem("email",email)
    localStorage.setItem("password",password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    
    set(ref(database , 'users/' + user.uid),{
      Username : username,
      Email : email
    })
    alert("Registration completed successfully");
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    });
  }
});
// let username = document.getElementById("UsernameInp").value;
// exports.username=username
