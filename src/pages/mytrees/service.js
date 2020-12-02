import request from 'umi-request';
import firebase from 'firebase'
import {Userdb, Treedb} from '../../../config/firebase'

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}
export async function queryAllTrees(params) {
  const treeIDs = params.currentuser.mytrees
  var mytrees = []
  console.log('Query all trees: ', treeIDs)
  for (var i = 0; i < treeIDs.length; i++){
    let gettreePromise = Treedb.doc(treeIDs[i]).get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          var mytree = doc.data()
          switch(mytree.region){
            case 0:
              mytree.region = '额济纳旗'
              break;
            case 1:
              mytree.region = '阿拉善盟左旗'
              break;
            case 2:
              mytree.region = '阿拉善盟右旗'
              break;
            default:
              mytree.region = '额济纳旗'
              break;
          }
          mytrees.push(mytree)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    let ret = await gettreePromise;
  }
  return mytrees
}
