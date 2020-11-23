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
  console.log('Complete firebase Register. ret:', ret)
  return ({
    status: status,
    currentAuthority: currentAuthority,
  })
}
