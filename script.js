import  { getAuth ,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import  {initializeApp}  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";


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
    const uid = user.uid;
    // document.getElementById("logoutAndProfileDiv").style.display="block";
    // ...
} else {
    // User is signed out
    // document.getElementById("logoutAndProfileDiv").style.display="hide";
    container.innerHTML='<button id="loginBtn"><a id="no-style" href="Login&SignUP/login.html">Login</a></button>'
  }
});


document.getElementById("logoutBtnProfile").addEventListener("click",()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        document.getElementById("logoutAndProfileDiv").style.display="hide";
        window.location.replace("https://m-abhiram.github.io/donation-management-system/");
        alert("Successfully logged out!")

      }).catch((error) => {
          // An error happened.
          alert("An error occured when logging you out!")
      });
});

document.getElementById("itemsNav").addEventListener("click",()=>{
  // console.log("clicked");
  document.getElementById("historyPage").innerHTML=""
  document.getElementById("historyPage").style.display="none";
  document.getElementById("item-holder").style.display="flex";
  document.getElementById("items-add").style.display="block";
  document.getElementById("aboutPage").style.display="none";
  document.getElementById("ngoPage").style.display="none";
  document.getElementById("itemsNav").classList.add("selected");
  document.getElementById("aboutNav").classList.remove("selected");
  document.getElementById("ngoNav").classList.remove("selected");
  document.getElementById("historyNav").classList.remove("selected");
  
});

document.getElementById("aboutNav").addEventListener("click",()=>{
  // console.log("clicked");
  document.getElementById("historyPage").innerHTML=""
  document.getElementById("historyPage").style.display="none";
  document.getElementById("aboutPage").style.display="block"
  document.getElementById("item-holder").style.display="none";
  document.getElementById("items-add").style.display="none";
  document.getElementById("ngoPage").style.display="none";
  document.getElementById("aboutNav").classList.add("selected");
  document.getElementById("itemsNav").classList.remove("selected");
  document.getElementById("ngoNav").classList.remove("selected");
  document.getElementById("historyNav").classList.remove("selected");
});

document.getElementById("ngoNav").addEventListener("click",()=>{
  // console.log("clicked");
  document.getElementById("historyPage").innerHTML=""
  document.getElementById("historyPage").style.display="none";
  document.getElementById("aboutPage").style.display="none"
  document.getElementById("item-holder").style.display="none"
  document.getElementById("ngoPage").style.display="block";
  document.getElementById("items-add").style.display="none";
  document.getElementById("ngoNav").classList.add("selected");
  document.getElementById("aboutNav").classList.remove("selected");
  document.getElementById("itemsNav").classList.remove("selected");
  document.getElementById("historyNav").classList.remove("selected");
});

document.getElementById("historyNav").addEventListener("click",()=>{
  // console.log("clicked");
  document.getElementById("historyPage").innerHTML=""
  document.getElementById("historyPage").style.display="block";
  document.getElementById("aboutPage").style.display="none"
  document.getElementById("item-holder").style.display="none";
  document.getElementById("items-add").style.display="none";
  document.getElementById("ngoPage").style.display="none";
  document.getElementById("historyNav").classList.add("selected");
  document.getElementById("aboutNav").classList.remove("selected");
  document.getElementById("itemsNav").classList.remove("selected");
  document.getElementById("ngoNav").classList.remove("selected");
  let dataBaseOfItems = JSON.parse(localStorage.getItem("dataBaseOfItems"));

  for(let i in dataBaseOfItems){
    const history = document.getElementById("historyPage")
    const templateHistory = document.getElementById("templateHistory");
    const contentHistory= templateHistory.content.cloneNode(true);
    history.prepend(contentHistory)
    document.getElementById("historyItemName").innerHTML =  "Item Name : "+dataBaseOfItems[i].item;
    document.getElementById("historyTime").innerHTML =  "At The Time : "+dataBaseOfItems[i].donationTime;
  }
  
});




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


let inputTag = document.getElementById('imgInput');
inputTag.addEventListener("change",function(){
  const reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener("load",()=>{
    localStorage.setItem("recent-image",reader.result);
  });
})



let uploadBtn = document.getElementById("upload-item");
uploadBtn.addEventListener("click",()=>{ 
  const main=document.getElementById("item-holder")
  const template = document.getElementById("item-template");
  const content= template.content.cloneNode(true);
  main.prepend(content);
  document.getElementById("itemNameTemplate").innerHTML = "Name : " + document.getElementById("name").value;
  document.getElementById("itemLocationTemplate").innerHTML = "Location : "+document.getElementById("item-location").value;
  document.getElementById("timeUsedTemplate").innerHTML = "Time-used : " + document.getElementById("timeUsed").value;
  document.getElementById("itemConditionTemplate").innerHTML = "Item Condition : "+document.getElementById("itemCondition").value;
  document.getElementById("contactTemplate").innerHTML = "Contact : " +document.getElementById("contactGmail").value;
  const recentImageDataUrl =  localStorage.getItem("recent-image");
  document.getElementById("itemImage").innerHTML='<img id="itemImg" src="" alt="item-image">';
  document.getElementById("itemImg").setAttribute("src",recentImageDataUrl);

  var d = Date();
  var new_data = {item : document.getElementById("name").value, location : document.getElementById("item-location").value, time : document.getElementById("timeUsed").value,condition : document.getElementById("itemCondition").value,img : localStorage.getItem("recent-image"),contact : document.getElementById("contactGmail").value,donationTime : d};

  var old_data = JSON.parse(localStorage.getItem("dataBaseOfItems"));
  old_data.push(new_data);
  localStorage.setItem("dataBaseOfItems",JSON.stringify(old_data));
});


//to close the upload popup
document.getElementById("close-upload").addEventListener("click",()=>{
  let div = document.getElementById("new");
  div.style.display="none";
  document.getElementById("name").value="";
  document.getElementById("item-location").value="";
  document.getElementById("timeUsed").value="";
  document.getElementById("itemCondition").value="";
  document.getElementById("contactGmail").value="";
});


window.onload = updateData()


window.onload = ()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          document.getElementById("logoutAndProfileDiv").style.display="block";
          document.getElementById("userInfo").innerHTML= "Username : "+ localStorage.getItem("username")+"<br>Email : "+ localStorage.getItem("loginEmailId") + "<br>"; 
        } 
    });
}


function updateData(){
  let dataBaseOfItems =  JSON.parse(localStorage.getItem("dataBaseOfItems"))
  for (let i in dataBaseOfItems){
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
    document.getElementById("contactTemplate").innerHTML="Contact : "+dataBaseOfItems[i].contact;
  }
}
