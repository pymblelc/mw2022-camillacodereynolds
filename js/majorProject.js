var apikey = "622e99eadced170e8c83a23a";
var url = 'https://careynolds-2125.restdb.io/rest/profiles';
var global_user_logged_in

//hiding the elements of the homepage until someone logs in 
function hide_home_page(){
    var home_page_elements = document.getElementsByClassName('home_page');
    for (var i = 0; i < home_page_elements.length; i ++) { 
        home_page_elements[i].style.display = 'none';
    }
}

function addProfiles(item, url, apikey){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }
    
    $.ajax(settings).done(function (response) {
        console.log('Item successfully added');
        console.log(response);
    });
}

//checking the logged user with database users 
function Login(url, apikey, username, password){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        for(var i=0; i<response.length; i++){
            //check if username and password equal the username and password field from database
            if (username == response[i].username && password == response[i].password){
                loggedUser = response[i];
                console.log("We got a USER!!")
                console.log(loggedUser);

                user_home_page_function(loggedUser, response);
            }
        }
    });
}


function user_home_page_function(user_logged_in, database){
    //need to hide all the stuff on the html
    //hiding the sign up section for when profile page is shown 
    var sign_up_elements = document.getElementsByClassName('sign-up');
    for (var i = 0; i < sign_up_elements.length; i ++) { 
        sign_up_elements[i].style.display = 'none';
    }

    //hiding the login section for when the profile page is shown 
    var login_up_elements = document.getElementsByClassName('Login');
    for (var i = 0; i < login_up_elements.length; i ++) { 
        login_up_elements[i].style.display = 'none';
    }

    //Showing the home page
    var home_page_elements = document.getElementsByClassName('home_page');
    for (var i = 0; i < home_page_elements.length; i ++) { 
        home_page_elements[i].style.display = 'block';
    }


    //welcome message = when the logged in user in detected show their a welcome message with their first and last name 
    welcome_message = "Welcome " + user_logged_in.firstname + user_logged_in.lastname + " !"
    console.log(welcome_message)
    document.getElementById("welcome_banner").innerHTML = welcome_message
    global_user_logged_in = user_logged_in
}

//finding profiles that match the age of the logged in user 
function matching_ages(data){
    logged_in_user = global_user_logged_in
    var matches = []
    for(var i=0; i<data.length; i++){
        //check if any users have the same age and display the username that is matched 
        if (data[i].age == logged_in_user.age && data[i].username != logged_in_user.username){
            matches.push(data[i].username) 
        }
    }
    console.log(matches)
    document.getElementById("matches").innerHTML = matches 
}


//when clicking btnSubmit make all the entered values go to the database to establish a profile 
$('#btnSubmit').click(function(){

    console.log('submitted');
    var tempItem = {username: $('#Username').val(), firstname: $('#FirstName').val(), lastname: $('#LastName').val(), gender: $('#Gender').val(), age: $('#Age').val(), dateOfBirth: $('#DateOfBirth').val(), password: $('#Password').val()};

    addProfiles(tempItem, url, apikey);
})

//when submitting the login require the username and password values entered and call login function 
$('#btnLoginForm').click(function(){
    console.log('you are logging in');
    var user = $('#Username_l').val()
    var pass = $('#Password_l').val()
    console.log(user)
    console.log(pass)
    Login(url, apikey, user, pass);
   
})

//when clicking button to find a match based off age call the matching age function 
$('#findMatchbtn').click(function(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log('Collecting all users .. now time to match ages');
        console.log(response);
        matching_ages(response)
    });


})

//Code to run at start
hide_home_page()