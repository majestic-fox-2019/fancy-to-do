var GoogleAuth;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly';
function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  
  gapi.client.init({
      'apiKey': "api-key",
      'clientId': 'client',
      'scope': SCOPE,
      'discoveryDocs': DISCOVERY_DOCS
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance()
    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus)
    // Handle initial sign-in state. (Determine if user is already signed in.)
    // var user = GoogleAuth.currentUser.get()
    
    
    // setSigninStatus()
    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#sign-in-or-out-button').click(function() {
      handleAuthClick()
    });
  })
  .catch(err => {
    makeMessage("Something Wrong on google api","danger")
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked 'Sign out' button.
    GoogleAuth.signOut()
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn()
  }
}

function revokeAccess() {
  GoogleAuth.disconnect()
}

function setSigninStatus(isSignedIn) {
  var user = GoogleAuth.currentUser.get()
  var id_token = user.getAuthResponse().id_token
  var profile = user.getBasicProfile()
  socialLogin(id_token)
  localStorage.setItem("email", profile.getName())
  localStorage.setItem('user',id_token)
  checkToken()
  var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {   
    } else {
      revokeAccess()
    }
}

function updateSigninStatus(isSignedIn) {
  setSigninStatus()
}

function addCalender(event){
  gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }).then(function(response){
    makeMessage("Success add to google calender")
  })
  .catch(function(err){
    makeMessage("Cant add to google calender</br>This account not connect to google oauth","danger")
  })
}