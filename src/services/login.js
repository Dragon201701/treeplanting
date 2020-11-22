import request from '@/utils/request';

//import firebase from 'firebase'
//require('firebase/auth')
//import firebaseconfig from '../../../../config/firebase'
// Not Used. 11/21/2020
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function AccountLogin(params) {
  /*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });*/
}