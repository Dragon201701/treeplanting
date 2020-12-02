import request from 'umi-request';
import firebase from 'firebase'
require('firebase/auth')
import {Userdb, Treedb} from '../../../config/firebase'
import { Tree } from 'antd';
import { update } from 'lodash';

export async function fakeSubmitForm(params) {
  console.log('Fake submit form: ', params,)
  let req =  request('/api/forms', {
    method: 'POST',
    data: params,
  });
  return req
}
export async function SubmitForm(params){
  var treeid
  console.log('Firebase submit form: ', params)
  // Create new Trees in the database
  let addtreePromise = Treedb.add({
    region: Number(params.region),
    name: params.treename,
    numtrees: Number(params.numtrees),
    owner: params.currentUser.userid,
  }).then(function(docRef){
    //console.log("Document written with ID: ", docRef.id);
    treeid = docRef.id
  }).catch(function(error){
    console.error("Error adding document: ", error);
  })
  let res = await addtreePromise;
  let updateuserdocPromise = Userdb.doc(params.currentUser.uid)

  // Update user actcodes array and add new tree into mytrees array.
  var actcodes = params.currentUser.actcodes
  var actcode = params.actcode
  console.log('User actcode: ', actcode)
  for(let i = 0; i < actcodes.length; i++){
    //console.log('Loop through actcode ', i, ' :', actcodes[i], ' equals: ', actcodes[i].actcode == actcode)
    if(actcodes[i].actcode == actcode){
      let numtreesavailable = actcodes[i].numtrees;
      if(numtreesavailable == params.numtrees){
        // Delete that entry
        actcodes.splice(i, 1)
        break;
      } else {
        actcodes[i].numtrees -= params.numtrees;
        break;
      }
    }
  }
  //console.log('New actcodes: ', actcodes)
  var mytrees = params.currentUser.mytrees
  mytrees.push(treeid)
  console.log('New my trees: ', mytrees)
  var userdocRef = Userdb.doc(params.currentUser.userid)
  let updateusertreesPromise = userdocRef.update({
    actcodes: actcodes,
    mytrees: mytrees
  }).then(function() {
    //console.log("Document successfully updated!");
  })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
  let ret = await updateusertreesPromise

  return {message: 'Ok'}
}
