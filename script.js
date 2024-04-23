import  { getAuth ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import  {initializeApp}  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { firebase }from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";


// import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'
// import { initializeApp } from "firebase/app";
// import {firebase} from 'firebase/app';
// import { getStorage } from "firebase/storage";



let firebaseConfig = {
  apiKey: "AIzaSyCQqF1yv1Bvodhv2oacOswdtu7aXsV4MJY",
  authDomain: "donation-management-syst-87f76.firebaseapp.com",
  databaseURL: "https://donation-management-syst-87f76-default-rtdb.firebaseio.com",
  projectId: "donation-management-syst-87f76",
  storageBucket: "donation-management-syst-87f76.appspot.com",
  messagingSenderId: "724531353078",
  appId: "1:724531353078:web:53270112df37609f1623d7",
  measurementId: "G-QK39GGVPZM"
};

const app = initializeApp(firebaseConfig);
document.addEventListener('DOMContentLoaded', function() {
  // Firebase initialization code here
  firebase.initializeApp(firebaseConfig);

});

const auth = getAuth(app);


let loginBtn = document.getElementById("loginBtn");
let container = document.getElementById("profile");
let main = document.getElementById("item-holder")

const user = auth.currentUser;




    // const storage = app.storage();
    // const firestore = firebase.firestore();
    // function uploadImage() {
    //   const fileInput = document.getElementById('imgInput');
    //   const file = fileInput.files[0];
    //   const storageRef = storage.ref(`images/${file.name}`);
      
    //   storageRef.put(file).then(() => {
    //     console.log("Image uploaded successfully!");
    //   }).catch(error => {
    //     console.error("Error uploading image: ", error);
    //   });
    // }

    // function saveData() {
    //   const textInput = document.getElementById('textInput');
    //   const textData = textInput.value;

    //   firestore.collection('data').add({
    //     textData: textData
    //   })
    //   .then(() => {
    //     console.log("Data saved successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error adding document: ", error);
    //   });
    // }

    // function retrieveData() {
    //   firestore.collection('data').get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error getting documents: ", error);
    //   });
    // }







onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    container.innerHTML='<a href="" target="_blank"><img id="profile-img" src="Login&SignUP/profile.png"></a>'
    
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    container.innerHTML='<button id="loginBtn"><a id="no-style" href="Login&SignUP/login.html">Login</a></button>'
  }
});


let more_buttons=document.getElementsByClassName("btn_more")
console.log(more_buttons)
for (let i=0;i<more_buttons.length;i++){
  more_buttons[i].addEventListener("click",()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        alert("You are logged in")
        
      
      } else {
        // User is signed out
        alert("You are logged out")

      }
    });
  });
}



document.getElementById("newItem").addEventListener("click",()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties

      let popUp=document.getElementById("new")
      popUp.style.display="block"
      // flag=true  
    
    } else {
      // User is signed out
      alert("You need to login first")
      
    }
  });
  
})

//to close the upload popup
document.getElementById("close-upload").addEventListener("click",()=>{
  let div = document.getElementById("new");
  div.style.display="none";
})


//adding the item information to the firebase and then updating the webpage
var files=[];
var ImgName,ImgUrl;
document.getElementById("upload-item").onclick = function(e){
  files = e.target.files;
  ImgName = document.getElementById("name").ariaValueMax;
  var uploadTask = firebase.storage().ref("Images/"+ImgName+".png").put(files[0]);
  uploadTask.on('state_changed',function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    document.getElementById
  }
  ,
  function(error){
    alert("error while saving image");
  }),
  function(){
    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
      ImgUrl = url
    });
    firebase.database().ref('Pictures/'+ImgName).set({
      Name : ImgName,
      Link : ImgUrl
    });
    alert("image added successfully");
  }
}

