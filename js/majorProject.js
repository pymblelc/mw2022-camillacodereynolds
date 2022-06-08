var apikey = "622e99eadced170e8c83a23a";
var url = "https://careynolds-2125.restdb.io/rest/profiles";
var global_user_logged_in;

//hiding the elements of the homepage until someone logs in
function hide_home_page() {
  var home_page_elements = document.getElementsByClassName("home_page");
  for (var i = 0; i < home_page_elements.length; i++) {
    home_page_elements[i].style.display = "none";
  }
}

//hides the sign in and sign up page when first entering the website 
function show_start_up_page(){
  var start_up_elements = document.getElementsByClassName("start_up");
  for (var i = 0; i<start_up_elements.length; i++){
    start_up_elements[i].style.display = "block";
  }
  var sign_up_elements = document.getElementsByClassName("sign-up");
  for (var i = 0; i < sign_up_elements.length; i++) {
    sign_up_elements[i].style.display = "none";
  }
  var login_up_elements = document.getElementsByClassName("Login");
  for (var i = 0; i < login_up_elements.length; i++) {
    login_up_elements[i].style.display = "none";
  }


}

//show and hide login and signup

$("#OpenLogin").click(function(){
  $('.Login').show()
  $("#OpenLogin").hide()
  $("#CreateAccount").hide()
})

$("#CreateAccount").click(function(){
  console.log('clicking button');
  $('.sign-up').show()
  $("#CreateAccount").hide()
  $('#OpenLogin').hide()
})


//calling the very original page 
show_start_up_page();


function addProfiles(item, url, apikey) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
    processData: false,
    data: JSON.stringify(item),
  };

  $.ajax(settings).done(function (response) {
    console.log("Item successfully added");
    console.log(response);
  });
}

//checking the logged user with database users
function Login(url, apikey, username, password) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      //check if username and password equal the username and password field from database
      if (
        username == response[i].username &&
        password == response[i].password
      ) {
        loggedUser = response[i];
        console.log("We got a USER!!");
        console.log(loggedUser);

        user_home_page_function(loggedUser, response);
      }
    }
  });
}

function user_home_page_function(user_logged_in, database) {
  //need to hide all the stuff on the html
  //hiding the sign up section for when profile page is shown
  var sign_up_elements = document.getElementsByClassName("sign-up");
  for (var i = 0; i < sign_up_elements.length; i++) {
    sign_up_elements[i].style.display = "none";
  }

  //hiding the login section for when the profile page is shown
  var login_up_elements = document.getElementsByClassName("Login");
  for (var i = 0; i < login_up_elements.length; i++) {
    login_up_elements[i].style.display = "none";
  }



  //Showing the home page
  var home_page_elements = document.getElementsByClassName("home_page");
  for (var i = 0; i < home_page_elements.length; i++) {
    home_page_elements[i].style.display = "block";
  }

  //^^^^^ 


  //welcome message = when the logged in user in detected show their a welcome message with their first and last name
  welcome_message =
    "Welcome " + user_logged_in.firstname + user_logged_in.lastname + " !";
  console.log(welcome_message);
  document.getElementById("welcome_banner").innerHTML = welcome_message;
  global_user_logged_in = user_logged_in;
}

//when clicking btnSubmit make all the entered values go to the database to establish a profile
$("#btnSubmit").click(function () {
  console.log("submitted");
  var tempItem = {
    username: $("#Username").val(),
    firstname: $("#FirstName").val(),
    lastname: $("#LastName").val(),
    gender: $("#Gender").val(),
    age: $("#Age").val(),
    birthMonth: $("#BirthMonth").val(),
    password: $("#Password").val(),
  };

  addProfiles(tempItem, url, apikey);
});

//^^^ use this for surevy values??????

//when submitting the login require the username and password values entered and call login function
$("#btnLoginForm").click(function () {
  console.log("you are logging in");
  var user = $("#Username_l").val();
  var pass = $("#Password_l").val();
  console.log(user);
  console.log(pass);
  Login(url, apikey, user, pass);
});

//finding profiles that match the age of the logged in user
function matching_ages(data) {
  logged_in_user = global_user_logged_in;
  var matches = [];
  for (var i = 0; i < data.length; i++) {
    //check if any users have the same age and display the username that is matched
    if (
      data[i].age == logged_in_user.age &&
      data[i].username != logged_in_user.username
    ) {
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("matches").innerHTML = matches;
}

//when clicking button to find a match based off age call the matching age function
$("#findMatchbtnAge").click(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log("Collecting all users .. now time to match ages");
    console.log(response);
    matching_ages(response);
  });
});

//finding matches based on the same gender
function matching_gender(data) {
  logged_in_user = global_user_logged_in;
  var Gendermatches = [];
  for (var i = 0; i < data.length; i++) {
    //check any users that are male and display their username
    if (
      data[i].gender == logged_in_user.gender &&
      data[i].username != logged_in_user.username
    ) {
      Gendermatches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("Gendermatches").innerHTML = Gendermatches;
}

//when clicking button to find a match based off gender call the gender matching function

$("#findMatchbtnGender").click(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log("Collecting all users .. now time to match gender");
    console.log(response);
    matching_gender(response);
  });
});

//finding matches based on the  opposite gender
function matching_OppositeGender(data) {
  logged_in_user = global_user_logged_in;
  var OppositeGendermatches = [];
  for (var i = 0; i < data.length; i++) {
    //check any users that are male and display their username
    if (
      data[i].gender !== logged_in_user.gender &&
      data[i].username != logged_in_user.username
    ) {
      OppositeGendermatches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("OppositeGendermatches").innerHTML =
    OppositeGendermatches;
}

//when clicking button to find a match based off gender call the gender matching function

$("#findMatchbtnOppositeGender").click(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log("Collecting all users .. now time to match opposite gender");
    console.log(response);
    matching_OppositeGender(response);
  });
});

//Code to run at start
hide_home_page();

//survey JS

console.log("Survey");
const ul_1 = document.querySelector(".option1");
const ul_2 = document.querySelector(".option2");
const ul_3 = document.querySelector(".option3");
const ul_4 = document.querySelector(".option4");
const ul_5 = document.querySelector(".option5");

const q1 = document.querySelector(".q1");
const q2 = document.querySelector(".q2");
const q3 = document.querySelector(".q3");
const q4 = document.querySelector(".q4");
const q5 = document.querySelector(".q5");

const survey = document.querySelector(".survey");
const end = document.querySelector(".end");

//First question
ul_1.addEventListener("click", function () {
  console.log('click question 1');
  q1.style.display = "none";
  q2.style.display = "block";
});


//second question
ul_2.addEventListener("click", function () {
  console.log('click question 2');
  q2.style.display = "none";
  q3.style.display = "block";
});

//third question
ul_3.addEventListener("click", function () {
  console.log('click question 3');
  q3.style.display = "none";
  q4.style.display = "block";
});

//fourth question
ul_4.addEventListener("click", function () {
  console.log('click question 4');
  q4.style.display = "none";
  q5.style.display = "block";
});

//last question, show thankyou message
ul_5.addEventListener("click", function () {
  console.log('click question 5');
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});


  //side bar stuff
  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px 
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  } */