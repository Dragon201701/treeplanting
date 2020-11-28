import request from 'umi-request';
import firebase from 'firebase'
require('firebase/auth')
require('firebase/firestore');
import {Userdb} from '../../../../config/firebase'

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
  var user = firebase.auth().currentUser;
  console.log('Firestore user datebase: ', Userdb)
  if (status == 'ok'){
    let dbregisterPromise = Userdb.doc(user.uid).set({
      name: '',
      email: user.email,
      actcodes: [],
      mytrees: [],
      type: 'user',
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    const ret2 = await dbregisterPromise
  }
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
    window.localStorage.setItem('emailForSignIn', params.mail);
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
