import request from '@/utils/request';
import firebase from 'firebase'
require('firebase/auth')

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
  }
  console.log('获取当前用户成功：', {useranme: name, email: email, avatar: photoUrl, userid: uid})
  return {useranme: name, email: email, avatar: photoUrl, userid: uid}
  
}
export async function queryNotices() {
  return request('/api/notices');
}
