var apikey = "622e99eadced170e8c83a23a";
var url = "https://careynolds-2125.restdb.io/rest/profiles";

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
/* - add back in later
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
*/

//show and hide login and signup

/* remove 
$("#OpenLogin").click(function(){
  $('.Login').show()
  $("#OpenLogin").hide()

})

$("#CreateAccount").click(function(){
  console.log('clicking button');
  $('.sign-up').show()
  $("#CreateAccount").hide()

})*/


//calling the very original page 
//show_start_up_page();


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

function add_dummy_response(item2, url2, apikey) {
  var settings2 = {
    async: true,
    crossDomain: true,
    url: url2,
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
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

  //check why this doesnt work
  var Start_up_elements = document.getElementsByClassName("Start_up");
  for (var i = 0; i < Start_up_elements.length; i++) {
    Start_up_elements[i].style.display = "none";
  }

//hiding the headings 

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

  
  var tempItem2 = {
    username: $("#Username").val(),
    question_one: "Blank",
    question_two: "Blank",
    question_three: "Blank",
    question_four: "Blank",
    question_five: "Blank",
  }
  
  add_dummy_response(tempItem2, url2, apikey);

  console.log("submitted");
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


//Adds the currently logged in users' responses to the answers database. 
function add_survey_response(id_value, q1_response_v, q2_response_v, q3_response_v, q4_response_v, q5_response_v) {

  var responseItem = {
    username: global_user_logged_in.username,
    question_one: q1_response_v,
    question_two: q2_response_v,
    question_three: q3_response_v,
    question_four: q4_response_v,
    question_five: q5_response_v
  };

  //url needs to have the unique ID of the specific record so that only this record gets updated. 
  url_unique = url2 + "/" + id_value;

  console.log(url_unique);

  var settings3 = {
    "async": true,
    "crossDomain": true,
    "url": url_unique,
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(responseItem)
  }
  
  $.ajax(settings3).done(function (response) {
    console.log("Response successfully added");
    console.log(response);
  });

}



var q1_response = 'nothing';
var q2_response = 'nothing';
var q3_response = 'nothing';
var q4_response = 'nothing';
var q5_response = 'nothing';

//question 1 event handlers 

$("#Summer").click(function () {
  q1_response = "Summer";
  q1.style.display = "none";
  q2.style.display = "block";
});

$("#Winter").click(function () {
  q1_response = "Winter";
  q1.style.display = "none";
  q2.style.display = "block";
});

$("#Autumn").click(function () {
  q1_response = "Autumn";
  q1.style.display = "none";
  q2.style.display = "block";
});

$("#Spring").click(function () {
  q1_response = "Spring";
  q1.style.display = "none";
  q2.style.display = "block";
});

//question 2 event handlers 

$("#FamFriends").click(function () {
  q2_response = "FamFriends";
  q2.style.display = "none";
  q3.style.display = "block";
});

$("#Working").click(function () {
  q2_response = "Working";
  q2.style.display = "none";
  q3.style.display = "block";
});

$("#Relaxing").click(function () {
  q2_response = "Relaxing";
  q2.style.display = "none";
  q3.style.display = "block";
});

$("#Adventurous").click(function () {
  q2_response = "Adventurous";
  q2.style.display = "none";
  q3.style.display = "block";
});

//question 3 event handlers 

$("#Sunrise").click(function () {
  q3_response = "Sunrise";
  q3.style.display = "none";
  q4.style.display = "block";
});

$("#Sunset").click(function () {
  q3_response = "Sunset";
  q3.style.display = "none";
  q4.style.display = "block";
});

$("#Night").click(function () {
  q3_response = "Night";
  q3.style.display = "none";
  q4.style.display = "block";
});

$("#Day").click(function () {
  q3_response = "Day";
  q3.style.display = "none";
  q4.style.display = "block";
});

//question 4 event handlers 

$("#Shows").click(function () {
  q4_response = "Show";
  q4.style.display = "none";
  q5.style.display = "block";
});

$("#Theatre").click(function () {
  q4_response = "Theatre";
  q4.style.display = "none";
  q5.style.display = "block";
});

$("#Reading").click(function () {
  q4_response = "Reading";
  q4.style.display = "none";
  q5.style.display = "block";
});

$("#Music").click(function () {
  q4_response = "Music";
  q4.style.display = "none";
  q5.style.display = "block";
});

//question 5 event handlers 

$("#Visiting").click(function () {
  q5_response = "Visiting";
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

$("#Sites").click(function () {
  q5_response = "Sites";
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

$("#Tropical").click(function () {
  q5_response = "Tropical";
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

$("#Ski").click(function () {
  q5_response = "Ski";
  q5.style.display = "none";
  survey.style.display = "none";
  end.style.display = "block";
});

//Submit button
$("#submit").click(function () {
  console.log("Check point 1")
  var settings = {
    async: true,
    crossDomain: true,
    url: url2,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log("Check point 2")
    console.log("Gets the entire 'answers' database");
    console.log(response);

    console.log("Check point 3")
    console.log(global_user_logged_in)

    //Finds the currently logged in user from the database and then calls 'add_survey_response' function which adds their responses to the 
    //answers database. 
    for (var i = 0; i < response.length; i++) {
      if (
        response[i].username == global_user_logged_in.username
      ) {
        // unique ID of the record containing the logged in users' username
        id_value = response[i]._id;
        add_survey_response(id_value, q1_response, q2_response, q3_response, q4_response, q5_response);
      }
    };
  });
//Add stuff in here one the submit button is pressed (i.e return to the start of the survey or show a message saying survey complete)
});




//overall match 
function OverallMatch(data) {
  logged_in_user = global_user_logged_in;
  logged_in_user_answers = null;

  // Get the current logged in users answers
  for (var i = 0; i < data.length; i++) {
    if (data[i].username == logged_in_user.username) {
      logged_in_user_answers = data[i];
    }
  }

  var matches = [];
  for (var i = 0; i < data.length; i++) {
    //check if any users have the same surevy results and display the username that is matched
    console.log(data[i])
    console.log(logged_in_user_answers)
    if (
      data[i].question_one == logged_in_user_answers.question_one &&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("BigMatch").innerHTML = matches;
}



//when clicking button to find a match based off age call the matching age function
$("#findOverallMatch").click(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: url2,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log("trying to do big match");
    console.log(response);
    OverallMatch(response);
  });
});











