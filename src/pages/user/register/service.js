import request from 'umi-request';
import firebase from 'firebase'
require('firebase/auth')
import firebaseconfig from '../../../../config/firebase'

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}
export async function Register(params){
  console.log('Firebase Create user with email: ', params.mail, ' passowrd: ', params.password)
  let status = 'ok', currentAuthority = 'user', message = 'Success'
  let registerPromise = firebase.auth().createUserWithEmailAndPassword(params.mail, params.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log('Firebase Register failed. error code: ', errorCode, ' error message: ', errorMessage)
    status = 'error'
    currentAuthority = 'user'
  });
  const ret = await registerPromise
  console.log('Complete firebase Register. ret:', ret, ' Start sending emial verification.')
  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://treeplanting-4254e.firebaseapp.com/welcome',
    // This must be true.
    handleCodeInApp: true,
  };
  firebase.auth().sendSignInLinkToEmail(params.mail, actionCodeSettings)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    console.log('Signin link successfully sent.')
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
    console.log('Send Signinlink to email ERROR: ', error)
  });
  return ({
    status: status,
    currentAuthority: currentAuthority,
  })
}
