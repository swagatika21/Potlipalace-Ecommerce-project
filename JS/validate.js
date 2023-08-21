
$(document).ready(function ()
 {

  function clearErrorOnInput(fieldId, errorId) {
    $(fieldId).on("input", function() {
      $(errorId).text("").removeClass("error-message");
    });
  }
  //clear personal data- error
  clearErrorOnInput("#fname", "#fname-err");
  clearErrorOnInput("#lname", "#lname-err");
  clearErrorOnInput("#emailId", "#mail-err");
  clearErrorOnInput("#phoneNum", "#phone-err");
 
  //clear addres errors
  clearErrorOnInput("#inputAddress", "#addr-err");
  clearErrorOnInput("#inputCity", "#city-err");
  clearErrorOnInput("#inputState", "#state-err");
  clearErrorOnInput("#inputcountry", "#country-err");
  clearErrorOnInput("#inputZip", "#zip-err");

  //clear password error
  clearErrorOnInput("#Password", "#pwd");
  clearErrorOnInput("#confPassword", "#pwd");

  function validatePerson() {
    let first_name = $("#fname").val();
    let last_name = $("#lname").val();
    let email = $("#emailId").val();
    let phoneNumber = $("#phoneNum").val();
   
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validEmail = emailRegex.test(email);
    let ValidNum = phoneNumberRegex.test(phoneNumber);

   

    if (first_name === "" || last_name === "" || phoneNumber === "" || email === "" )
    {
      $("#fname-err").append("Please fill First name field.").addClass("error-message");
      $("#lname-err").append("Please fill last name field.").addClass("error-message");
      $("#mail-err").append("Please fill email field.").addClass("error-message");
      $("#phone-err").append("Please fill Phone number field.").addClass("error-message");

    } else if (!validEmail || email.length < 10) {
      $("#mail-err").append("Enter a valid email.").addClass("error-message");
    } else if (!ValidNum) {
      $("#phone-err").append("Enter a valid phone number.").addClass("error-message");
    }
    else{
      return true;
      
    }

  }

  function validateAddress() {
    let address = $("#inputAddress").val();
    let city = $("#inputCity").val();
    let state = $("#inputState").val();
    let country = $("#inputcountry").val();
    let zip = $("#inputZip").val();

    let numberRegex = /\d/;

    if (address === "" || city === "" || state === "" || country === "" || zip === "") {
      $("#addr-err").append("Please fill Address field.").addClass("error-message");
      $("#city-err").append("Please fill city field.").addClass("error-message");
      $("#state-err").append("Please fill State field.").addClass("error-message");
      $("#country-err").append("Please fill Country field.").addClass("error-message");
      $("#zip-err").append("Please fill Zip field.").addClass("error-message");

    } else if (address.length > 50) {
      $("#addr-err").append("Max length of address is 50.").addClass("error-message");
    } else if (numberRegex.test(city) || numberRegex.test(state) || numberRegex.test(country)) {
      $("#city-err").append("City should not contain numbers.").addClass("error-message");
      $("#state-err").append(" State should not contain numbers.").addClass("error-message");
      $("#country-err").append("Country should not contain numbers.").addClass("error-message");
      
    }
    else{
      return true;
      
    }
  }
  
 
  function validatePassword() {
    let password = $("#Password").val();
    let confirm = $("#confPassword").val();

    
    $("#pwd").text("");

    if (password !== confirm) {
      $("#pwd").append("Password does not match.").css("color", "red");
    } else if (password.length < 8 && confirm.length < 8) {
      $("#pwd").append("Password must be at least 8 characters.").css("color", "red");
    } else {
      $("#pwd").append("Good to go!").css("color", "green");
      return true;
    }
     
  }

  $("#submit-btn").click(function (event) {
    let isPersonValid = validatePerson();
    let isPasswordValid = validatePassword();

    if (isPersonValid && isPasswordValid) {
      event.preventDefault();
      window.location.href = "./home.html";
    } else {
      event.preventDefault();
    }
    
    event.preventDefault();
  });

 


  function clearErrorOnInput(fieldId, errorId) {
    $(fieldId).on("input", function() {
      $(errorId).text("").removeClass("error-message");
    });
  }
  clearErrorOnInput("#emailId", "#mail-err");
  clearErrorOnInput("#Password", "#pwd");

 function validatePassword() {
    let password = $("#Password").val();

    $("#pwd").text("");

    if (password.length < 8 ) {
      $("#pwd").append("Password must be at least 8 characters.").css("color", "red");
    } else {
      $("#pwd").append("Good to go!").css("color", "green");
      return true;
    }
     
  }

 function validateMail(){
  let email = $("#emailId").val();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let validEmail = emailRegex.test(email);
  if ( email === "" )
  {
   
    $("#mail-err").append("Please fill email field.").css("color", "red");

  } else if (!validEmail || email.length < 10) {
    $("#mail-err").append("Enter a valid email.").css("color", "red");
  }
  else{
    return true;
    
  }
 }


  $("#signin-btn").click(function (event) {
    let isvalidateMail = validateMail();
    let isPasswordValid = validatePassword();
  
    if (isvalidateMail && isPasswordValid) {
      event.preventDefault();
      window.location.href = "./home.html";
    } else {
      event.preventDefault();
    }
    
    event.preventDefault();
  });
  

  $("#checkout-btn").click(function (event) {
    let isvalidperson = validatePerson();
    let isvalidaddr = validateAddress();
  
    if (isvalidperson && isvalidaddr) {
      event.preventDefault();
      window.location.href = "./home.html";
    } else {
      event.preventDefault();
    }
    
    event.preventDefault();
  });
  
})



