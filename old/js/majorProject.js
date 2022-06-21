var apikey = "622e99eadced170e8c83a23a";
var url = "https://careynolds-2125.restdb.io/rest/profiles";

var apikey2 = "74c3d850e010da15a3c6fc5248fa20fb09854"
var url2 = "https://careynolds-2125.restdb.io/rest/answers";

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

//adding a profile to allow the username of a user to go to the other database 
function add_dummy_response(item2, url2, apikey2) {
  var settings2 = {
    async: true,
    crossDomain: true,
    url: url2,
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey2,
      "cache-control": "no-cache",
    },
    processData: false,
    data: JSON.stringify(item2),
  };

  $.ajax(settings2).done(function (response) {
    console.log("Dummy response successfully added");
    console.log(response);
  });

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

function add_survey_response(username, question, answer) {
  console.log(username)
  console.log(question)
  console.log(answer)

}

//const summer = document.querySelector("Summer")


//First question
/*
ul_1.addEventListener("click", function () {
  console.log('click question 1');
  q1.style.display = "none";
  q2.style.display = "block";
});
*/

//question 1 event handlers 

$("#Summer").click(function () {
  add_survey_response("user", "question", "answer")
  q1.style.display = "none";
  q2.style.display = "block";
});

$("#Winter").click(function () {
  add_survey_response("user", "question", "answer")
  q1.style.display = "none";
  q2.style.display = "block";
});

$("#Autumn").click(function () {
  add_survey_response("user", "question", "answer")
  q1.style.display = "none";
  q2.style.display = "block";
});

$("#Spring").click(function () {
  add_survey_response("user", "question", "answer")
  q1.style.display = "none";
  q2.style.display = "block";
});

//question 2 event handlers 

$("#FamFriends").click(function () {
  add_survey_response("user", "question", "answer")
  q2.style.display = "none";
  q3.style.display = "block";
});

$("#Working").click(function () {
  add_survey_response("user", "question", "answer")
  q2.style.display = "none";
  q3.style.display = "block";
});

$("#Relaxing").click(function () {
  add_survey_response("user", "question", "answer")
  q2.style.display = "none";
  q3.style.display = "block";
});

$("#Adventurous").click(function () {
  add_survey_response("user", "question", "answer")
  q2.style.display = "none";
  q3.style.display = "block";
});

//question 3 event handlers 

$("#Sunrise").click(function () {
  add_survey_response("user", "question", "answer")
  q3.style.display = "none";
  q4.style.display = "block";
});

$("#Sunset").click(function () {
  add_survey_response("user", "question", "answer")
  q3.style.display = "none";
  q4.style.display = "block";
});

$("#Night").click(function () {
  add_survey_response("user", "question", "answer")
  q3.style.display = "none";
  q4.style.display = "block";
});

$("#Day").click(function () {
  add_survey_response("user", "question", "answer")
  q3.style.display = "none";
  q4.style.display = "block";
});

//question 4 event handlers 

$("#Show").click(function () {
  add_survey_response("user", "question", "answer")
  q4.style.display = "none";
  q5.style.display = "block";
});

$("#Theatre").click(function () {
  add_survey_response("user", "question", "answer")
  q4.style.display = "none";
  q5.style.display = "block";
});

$("#Reading").click(function () {
  add_survey_response("user", "question", "answer")
  q4.style.display = "none";
  q5.style.display = "block";
});

$("#Music").click(function () {
  add_survey_response("user", "question", "answer")
  q4.style.display = "none";
  q5.style.display = "block";
});

//question 5 event handlers 

$("#Visiting").click(function () {
  add_survey_response("user", "question", "answer")
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

$("#Sites").click(function () {
  add_survey_response("user", "question", "answer")
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

$("#Tropical").click(function () {
  add_survey_response("user", "question", "answer")
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

$("#Ski").click(function () {
  add_survey_response("user", "question", "answer")
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

/*adding a function to get survey responses into the new database 
function add_survey_response (item,url, apikey){
  var jsondata = {"field1": "new value","field2": "xxx"};
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://careynolds-2125.restdb.io/rest/answers/(ObjectID)",
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "<your CORS apikey here>",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  
}

add_survey_response(tempItem, url, apikey) */

  /* Survey helps
  let answers = {
    favourtieFood: "asdas",
    age: 15,
    user: "mr-josh"
  };

  // Post it to a new restDb table called survey answers*/

  // Get the signup form div


let signup_form = document.getElementById("sign-up-form");
let signup_button = document.getElementById("CreateAccount");
let login_form = document.getElementById("Login-form");
let login_button = document.getElementById("OpenLogin");

//let see_profile = document.getElementById("GoToProfile");


signup_button.addEventListener("click", function() {
    console.log(signup_form.classList.contains("hidden"));
    // If singup form has hidden class (true) then remove the class to show the element
    if (signup_form.classList.contains("hidden")) {
        signup_form.classList.remove("hidden")
    }
    else {
        signup_form.classList.add("hidden");
    }
    
    // If signup form does not have hidden class (false) add the the class to hide the element

    // signup_form.classList.add("hidden")
    // signup_form.classList.remove("hidden")
});

login_button.addEventListener("click", function(){
    console.log(login_form.classList.contains("hidden"));
    if (login_form.classList.contains("hidden")){
        login_form.classList.remove("hidden")
    }
    else{
        login_form.classList.add("hidden");
    }
})

