var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.jumbotron-bg').css('height', (jumboHeight-scrolled) + 'px');
}
$(window).scroll(function(e){
    parallax();
});
$(document).ready(function () {
   // $('div.hidden').fadeIn(500).removeClass('hidden');
    parallax();
});



    var signupForm = document.getElementById('signup-form');
    var signupSuccess = document.getElementById('signup-success');
    var signupError = document.getElementById('signup-error');
    var signupBtn = document.getElementById('signup-button');

    var onSignupComplete = function(error) {
      signupBtn.disabled = false;
      if (error) {
        signupError.innerHTML = 'Ojdå, ett fel har inträffat';
      } else {
        signupSuccess.innerHTML = 'Tack så mycket, nu är du med :)';
        // hide the form
        signupForm.style.display = 'none';
      }
    };
    function signup(formObj) {
        // Store emails to firebase
        writeUserData(formObj.signupName.value, 
          formObj.signupEmail.value,
          formObj.invitationcode.value,
          formObj.message.value
          );

        signupBtn.disabled = true;
        return false;
    }

    function writeUserData(name, email, invitationCode,message) {
  firebase.database().ref('users').push().set({
    username: name,
    email,
    invitationCode, 
    message
  },onSignupComplete);
}
