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

function hide_home_Navigation() {
  var home_navigation_elements = document.getElementsByClassName("homeNavigation");
  for (var i = 0; i < home_page_elements.length; i++) {
    home_navigation_elements[i].style.display = "none";
  }
}

//add profiles function
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

//adding the username to the answers database 
function add_second_response(item2, url2, apikey) {
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
    console.log("Second username successfully added to the db");
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
  var start_up_elements = document.getElementsByClassName("start_up");
  for (var i = 0; i < start_up_elements.length; i++) {
    start_up_elements[i].style.display = "block";
  }

//hiding the headings 

  //Showing the home page
  var home_page_elements = document.getElementsByClassName("home_page");
  for (var i = 0; i < home_page_elements.length; i++) {
    home_page_elements[i].style.display = "block";
  }

   //Showing the nav bar
   var home_navigation_elements = document.getElementsByClassName("homeNavigation");
   for (var i = 0; i < home_navigation_elements.length; i++) {
     home_navigation_elements[i].style.display = "block";
   }


  //welcome message = when the logged in user in detected show their a welcome message with their first and last name
  welcome_message =
  "Welcome " + user_logged_in.firstname + user_logged_in.lastname + " !";
  console.log(welcome_message);
  document.getElementById("welcome_banner").innerHTML = welcome_message;
  global_user_logged_in = user_logged_in;
  

  welcome_name =
  "Name" + ": "+ user_logged_in.firstname ;
  console.log(welcome_name);
  document.getElementById("welcome_name").innerHTML = welcome_name;
  global_user_logged_in = user_logged_in;

  welcome_lastname =
  "Last Name" + ": " + user_logged_in.lastname ;
  console.log(welcome_lastname);
  document.getElementById("welcome_lastname").innerHTML = welcome_lastname;
  global_user_logged_in = user_logged_in;

  welcome_gender =
  "Gender" + ": " + user_logged_in.gender ;
  console.log(welcome_gender);
  document.getElementById("welcome_gender").innerHTML = welcome_gender;
  global_user_logged_in = user_logged_in;

  welcome_age =
  "Age" + ": " + user_logged_in.age ;
  console.log(welcome_age);
  document.getElementById("welcome_age").innerHTML = welcome_age;
  global_user_logged_in = user_logged_in;

  welcome_birthmonth =
  "Birth Month" + ": " + user_logged_in.birthMonth ;
  console.log(welcome_birthmonth);
  document.getElementById("welcome_birthmonth").innerHTML = welcome_birthmonth;
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
  
  add_second_response(tempItem2, url2, apikey);

  console.log("submitted");
});


//when submitting the login require the username and password values entered and call login function
$("#btnLoginForm").click(function () {
  $("#logoSmall").hide();
  $("#homeLogo").show();


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
    //check any users that arent male and display their username
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

//when clicking button to find a match based off opposite gender call the opposite gender matching function

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


//finding matches based on the same birthday moth 
function matching_birthMonth(data) {
  logged_in_user = global_user_logged_in;
  var BirthMonthmatches = [];
  for (var i = 0; i < data.length; i++) {
    //check any users that have the same birthday month and check properties
    if (
      data[i].birthMonth == logged_in_user.birthMonth &&
      data[i].username != logged_in_user.username
    ) {
      BirthMonthmatches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("BirthMonthmatches").innerHTML = BirthMonthmatches;
}

//when clicking button to find a match based off birth month call the birth month matching function

$("#findMatchbtnBirthMonth").click(function () {
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
    console.log("Collecting all users .. now time to match birth month");
    console.log(response);
    matching_birthMonth(response);
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
  end.style.display = "block";
});

$("#Sites").click(function () {
  q5_response = "Sites";
  q5.style.display = "none";
  end.style.display = "block";
});

$("#Tropical").click(function () {
  q5_response = "Tropical";
  q5.style.display = "none";
  end.style.display = "block";
});

$("#Ski").click(function () {
  q5_response = "Ski";
  q5.style.display = "none";
  end.style.display = "block";
});

//Submit button for the survey
$("#submit").click(function () {
  q1.style.display = "block";
  end.style.display="none";
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

});




//overall match that matched users who have all five survey questions the same 
function FirstMatch(data) {
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
      data[i].question_two == logged_in_user_answers.question_two&&
      data[i].question_three == logged_in_user_answers.question_three&&
      data[i].question_four == logged_in_user_answers.question_four&&
      data[i].question_five == logged_in_user_answers.question_five&&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("FirstOverallMatch").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//when clicking button for the big match find a match based off a user has all the same survey results 
$("#FirstMatch").click(function () {
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
    console.log("First Match");
    console.log(response);
    FirstMatch(response);
  });
});

//second overall match that matches uses with four of the same survey results 
function SecondMatch(data) {
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
      data[i].question_two == logged_in_user_answers.question_two&&
      data[i].question_three == logged_in_user_answers.question_three&&
      data[i].question_four == logged_in_user_answers.question_four&&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("SecondOverallMatch").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//when clicking button for the second match find a match based off a user that has 4 of the same results
$("#SecondMatch").click(function () {
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
    console.log("Second Match");
    console.log(response);
    SecondMatch(response);
  });
});

//third overall match that matches uses with three of the same survey results 
function ThirdMatch(data) {
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
      data[i].question_two == logged_in_user_answers.question_two&&
      data[i].question_three == logged_in_user_answers.question_three&&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("ThirdOverallMatch").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//when clicking button for the third match find a match based off a user has 3 of the same survey results 
$("#ThirdMatch").click(function () {
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
    console.log("Third Match");
    console.log(response);
    ThirdMatch(response);
  });
});

//fourth overall match that matches uses with 2 of the same survey results 
function FourthMatch(data) {
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
      data[i].question_two == logged_in_user_answers.question_two&&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("FourthOverallMatch").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//when clicking button to find a match based off the function that calls for 2 of the same answers 
$("#FourthMatch").click(function () {
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
    console.log("Fourth Match");
    console.log(response);
    FourthMatch(response);
  });
});

//match users that have the same question 1 result - favourite season questions 
function Q1Match(data) {
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
  document.getElementById("QuestionOneMatchResult").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//find the same q1 match 
$("#QuestionOneMatch").click(function () {
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
    Q1Match(response);
  });
});

//match users with the same questions 2 result - how they like to spend their free time 
function Q2Match(data) {
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
      data[i].question_two == logged_in_user_answers.question_two &&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username) ;
    }
  }
  console.log(matches);
  document.getElementById("QuestionTwoMatchResult").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//find the same q2 match
$("#QuestionTwoMatch").click(function () {
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
    Q2Match(response);
  });
});

//match based off the result from survey question 3 - what their favourite time of day is 
function Q3Match(data) {
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
      data[i].question_three == logged_in_user_answers.question_three &&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("QuestionThreeMatchResult").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}


//find the same q3 match
$("#QuestionThreeMatch").click(function () {
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
    console.log("question 3 match");
    console.log(response);
    Q3Match(response);
  });
});

//match based off the result from survey question 4 - what kind of entertainment they like 

function Q4Match(data) {
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
      data[i].question_four == logged_in_user_answers.question_four &&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("QuestionFourMatchResult").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//find the same q4 match
$("#QuestionFourMatch").click(function () {
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
    console.log("question 4 match");
    console.log(response);
    Q4Match(response);
  });
});

//match based off the result from survey question 5 - what their dream holiday is 

function Q5Match(data) {
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
      data[i].question_five == logged_in_user_answers.question_five &&
      data[i].username != logged_in_user.username){
      matches.push(data[i].username);
    }
  }
  console.log(matches);
  document.getElementById("QuestionFiveMatchResult").innerHTML = matches; //make sure that the element ID is different to the button ID otherwise the result will turn up as the button
}



//Find the same q5 match
$("#QuestionFiveMatch").click(function () {
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
    Q5Match(response);
  });
});

//open the login page
$('#ShowLogin').click(function(){
  $("#logoSmall").show();

  $("#sign-up-form").hide();
  $("#login-form").show();
  $("#logo").hide();
  $("#ShowLogin").hide();
  $("#ShowSignUp").hide();
})

//open the signUp page
$('#ShowSignUp').click(function(){

  $("#logoSmall").show();
  $("#sign-up-form").show();
  $("#login-form").hide();
  $("#logo").hide();
  $("#ShowLogin").hide();
  $("#ShowSignUp").hide();

})


//showing sign in page when first go to the website 
$('#btnFlipLogin').click(function(){
  $("#sign-up-form").hide();
  $("#login-form").show();
})

//showing sign in page when first go to the website 
$('#btnFlipSignup').click(function(){
  $("#sign-up-form").show();
  $("#login-form").hide();
})



//when just signed up show a thankyou message and show a button that takes back to home
$('#btnSubmit').click(function(){
  $("#sign-up-form").hide();
  $("#SignUpComplete").show();
  $("#start-up").hide();
})

//click return to home and takes back to the original home page 
$('#btnReturnToLogin').click(function(){
  $("#login-form").show();
  $("#SignUpComplete").hide();
  $("#start-up").show();
})


//switch to page 2 - survey page
$('#Page2').click(function(){
  $("#surveyPage").show();
  $("#homeNavigation").show();
  $("#home-page").hide();
  $("#matchesPage").hide();
  $("#profilePage").hide();
  $("#ProfileMatchesPage").hide();
  $("#SurveyMatchesPage").hide();

 
})

//switch to page 3 - matches page
$('#Page3').click(function(){
  $("#surveyPage").hide();
  $("#homeNavigation").show();
  $("#home-page").hide();
  $("#matchesPage").show();
  $("#profilePage").hide();
  $("#ProfileMatchesPage").hide();
  $("#SurveyMatchesPage").hide();
  $("#BigMatchesPage").hide();
  $("#SurveyMatch").show();
  $("#ProfileMatch").show(); 
  $("#BackMatches").hide();
})


//switch to page 4 - your profile page 
$('#Page4').click(function(){
  $("#surveyPage").hide();
  $("#homeNavigation").show();
  $("#home-page").hide();
  $("#matchesPage").hide();
  $("#profilePage").show();
})

//switch back to page 1 - home page 
$('#Page1').click(function(){
  $("#surveyPage").hide();
  $("#homeNavigation").show();
  $("#home-page").show();
  $("#matchesPage").hide();
  $("#profilePage").hide();
})

//when clicking the survey matches page show all the buttons for a survey match 
$('#SurveyMatch').click(function(){
  $("#ProfileMatchesPage").hide();
  $("#SurveyMatchesPage").show();
  $("#BigMatchesPage").hide();
  $("#SurveyMatch").hide();
  $("#ProfileMatch").hide();
  $("#BigMatch").hide();
  $("#BackMatches").show();

})

//when clicking the profile matches page show all the buttons for a profile match 
$('#ProfileMatch').click(function(){
  $("#ProfileMatchesPage").show();
  $("#SurveyMatchesPage").hide();
  $("#BigMatchesPage").hide();
  $("#SurveyMatch").hide();
  $("#ProfileMatch").hide();
  $("#BigMatch").hide();
  $("#BackMatches").show();
})

//when clicking the big matches page show all the big matches buttons 
$('#BigMatch').click(function(){
  $("#ProfileMatchesPage").hide();
  $("#SurveyMatchesPage").hide();
  $("#BigMatchesPage").show();
  $("#SurveyMatch").hide();
  $("#ProfileMatch").hide();
  $("#BigMatch").hide();
  $("#BackMatches").show();
})

//when clicking back matches take it back to original matches page
$('#BackMatches').click(function(){
  $("#ProfileMatchesPage").hide();
  $("#SurveyMatchesPage").hide();
  $("#BigMatchesPage").hide();
  $("#SurveyMatch").show();
  $("#ProfileMatch").show();
  $("#BigMatch").show();
  $("#BackMatches").hide();
}) 


//logging out 
$('#Logout').click(function(){
  $("#profilePage").hide();
  $("#logout").show();

})

$('#yes').click(function(){
  $("#profilePage").hide();
  $("#logout").hide();
  $("#homeNavigation").hide();
  $("#Login").show();
  $("#logoSmall").show();
  $("#sign-up-form").hide();
  $("#login-form").show();
  $("#logo").hide();
  $("#ShowLogin").hide();
  $("#ShowSignUp").hide();
})

$('#no').click(function(){
  $("#profilePage").show();
  $("#logout").hide();
})













