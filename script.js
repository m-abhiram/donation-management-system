import  { getAuth ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import  {initializeApp}  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { dataBaseOfItems } from "./db.js";

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

const auth = getAuth(app);


let loginBtn = document.getElementById("loginBtn");
let container = document.getElementById("profile");
let main = document.getElementById("item-holder")

const user = auth.currentUser;

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


// let more_buttons=document.getElementsByClassName("btn_more")
// for (let i=0;i<more_buttons.length;i++){
//   more_buttons[i].addEventListener("click",()=>{
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         alert("You are logged in")
        
      
//       } else {
//         // User is signed out
//         alert("You are logged out")

//       }
//     });
//   });
// }



document.getElementById("newItem").addEventListener("click",()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties

      let popUp=document.getElementById("new")
      popUp.style.display="block"
    
    } else {
      // User is signed out
      alert("You need to login first")
      
    }
  });
  
})

if (localStorage.getItem("dataBaseOfItems")==null){ 
  localStorage.setItem("dataBaseOfItems","[]")
}
let uploadBtn = document.getElementById("upload-item");

uploadBtn.addEventListener("click",()=>{
  // itemName : document.getElementById("name").value,
  // phoneNumber : document.getElementById("phoneNumber").value,
  // location : ,
  // timeUsed : document.getElementById("timeUsed").value,
  // condition : document.getElementById("itemCondition").value,
  // gmail : document.getElementById("userGmail").value


  
  const main=document.getElementById("item-holder")
  const template = document.getElementById("item-template");
  const content= template.content.cloneNode(true);
  main.prepend(content);
  
  let inputTag = document.getElementById('imgInput');
  inputTag.addEventListener("change",function(){
    const reader = new FileReader();
    reader.addEventListener("load",()=>{
      localStorage.setItem("recent-image",reader.result);
    });
    reader.readAsDataURL(this.files[0]);
  })

  document.getElementById("itemNameTemplate").innerHTML = "Name : " + document.getElementById("name").value;
  document.getElementById("itemLocationTemplate").innerHTML = "Location : "+document.getElementById("item-location").value;
  document.getElementById("timeUsedTemplate").innerHTML = "Time-used : "+document.getElementById("timeUsed").value;
  document.getElementById("itemConditionTemplate").innerHTML = "Item Condition : "+document.getElementById("itemCondition").value;

  const recentImageDataUrl =  localStorage.getItem("recent-image");
  document.getElementById("itemImage").innerHTML='<img id="itemImg" src="" alt="item-image">';
  document.getElementById("itemImg").setAttribute("src",recentImageDataUrl);

  var new_data = {item : document.getElementById("name").value, location : document.getElementById("item-location").value, time : document.getElementById("timeUsed").value,condition : document.getElementById("itemCondition").value,img : localStorage.getItem("recent-image")};

  var old_data = JSON.parse(localStorage.getItem("dataBaseOfItems"));
  old_data.push(new_data);
  localStorage.setItem("dataBaseOfItems",JSON.stringify(old_data));
  if (localStorage.getItem("dataBaseOfItems")!=null){
    console.log(localStorage.getItem("dataBaseOfItems"));
  }

  // div.style.display="none";
  // document.getElementById("name").value="";
  // document.getElementById("item-location").value="";
  // document.getElementById("timeUsed").value="";
  // document.getElementById("itemCondition").value="";

  // dataBaseOfItems.unshift({item : document.getElementById("name").value, location : document.getElementById("item-location").value, time : document.getElementById("timeUsed").value,condition : document.getElementById("itemCondition").value});

});


//to close the upload popup
document.getElementById("close-upload").addEventListener("click",()=>{
  let div = document.getElementById("new");
  div.style.display="none";
  document.getElementById("name").value="";
  document.getElementById("item-location").value="";
  document.getElementById("timeUsed").value="";
  document.getElementById("itemCondition").value="";
})


//adding the item information to the firebase and then updating the webpage
function updateData(){
  let dataBaseOfItems =  JSON.parse(localStorage.getItem("dataBaseOfItems"))
  for (let i in dataBaseOfItems){
    console.log("Item : "+dataBaseOfItems[i].item);
    console.log("Time used : "+dataBaseOfItems[i].time);
    console.log("Condition : "+dataBaseOfItems[i].condition);
    console.log("Location : "+dataBaseOfItems[i].location);
    console.log("Image URL : "+dataBaseOfItems[i].img);

    const main=document.getElementById("item-holder")
    const template = document.getElementById("item-template");
    const content= template.content.cloneNode(true);
    main.prepend(content);
    document.getElementById("itemNameTemplate").innerHTML = "Item : " + dataBaseOfItems[i].item;
    document.getElementById("itemLocationTemplate").innerHTML = "Location : "+dataBaseOfItems[i].location;
    document.getElementById("timeUsedTemplate").innerHTML = "Time-used : "+dataBaseOfItems[i].time;
    document.getElementById("itemConditionTemplate").innerHTML = "Item Condition : "+dataBaseOfItems[i].condition;
    const imageUrl = dataBaseOfItems[i].img
    document.getElementById("itemImage").innerHTML='<img id="itemImg" src="" alt="item-image">';
    document.getElementById("itemImg").setAttribute("src",imageUrl);
  }
}
window.onload = updateData()


let more_buttons=document.getElementsByClassName("btn_more")
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
