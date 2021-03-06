import firebase from 'firebase'
//require('firebase/auth')
require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDF5QxBeM9PgfeGWvW1duLtSXbYXni9akE",
    authDomain: "treeplanting-4254e.firebaseapp.com",
    databaseURL: "https://treeplanting-4254e.firebaseio.com",
    projectId: "treeplanting-4254e",
    storageBucket: "treeplanting-4254e.appspot.com",
    messagingSenderId: "239391991596",
    appId: "1:239391991596:web:d51b2fe546181f4c5e6e89",
    measurementId: "G-2CLNNFB61E"
};

let serviceAccount = {
    "type": "service_account",
    "project_id": "treeplanting-4254e",
    "private_key_id": "5a68e404ad569eb6f281447663245688002f3d13",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDrHv5t7r4lrp6J\npeAOQSn51ps4SUF5izB/r+MLvuXnHRGU4eOD8hnm15fL+NgnixroT2w/AKQjfrFq\nmReHatKLhGRYC+kGXScOs9NPaTnRJ1+YVUywUFFT3NmY16BqRvwmvk8PKB+zhdXR\n96ND6M+YgVXpy6yY1mQxg5zMnfM1z9VAn8UDGDAgdiGuY3c21yZbqV+NlRvqH9wd\ntMesdbQimlc5Io5rSqMymLLm7+WpVIYNeDCp9ZKwITEuFZPhQq6J2gCeaBkF670i\nRWdv6VozCxqnJhbej0Cl4L4UVRvWZ+C6W5xj8OCmjaUcxNblbkACykMgatJrLBrF\n/L7wIHuHAgMBAAECggEAKzxuViHedoh3X+GQY56pDOfhcEbMUwD9AKYD7u+CUG8g\nggvN7kARckk4AUq32QG0B38/bRB9nodYMb2IPZ8vq3dDiotaJRDxMztvQr2bY7JF\nWnppGU0Tv4OvwfL47UIzcR5y5FshBT65tJxAuiawMh+qgE0zZoGaOB63MUtkY4MD\ns+ilyYG1yQO0zBk4jPeYqFsDVHLK251e6Yg0kNVIKCN//cbFWtpsF75krrCt7xjG\nluZuvwiAuVpPr3JXUVL9tpuAGObgEsOsCHT5LhgiCOBuJ5SKFbLnq28Cz3ZhmmXs\nHOMaivnOsubgYLRKk0nzGbYwD+3rx/k1ygH7/tcsoQKBgQD8eMP6fDk9DucMAX4V\nbd3yJxDuqRoNXLiB6g0omcHpIsl/mOLS2++IVWHcBdkSj6WnoB5uJD8dC5OiJioh\ndgtYzNp3zUdnjLeIiQ9DdYO6nX4sCT0f0QehjpvDEv6ofc18G/RSsJoyqvGtEs9q\ncpNro5HefaXw3ru55gc2ooS+pwKBgQDuaCe3k1cRWDMvNm2VZkd6ig9Jd8Vzdxru\n3f5EH7dky1VsKqWQmFXesTCriyACW7h0q1W1ydIJexD2QyyXUB1+NpAE8pWvXhVF\nQp4eOFUdj4dzcaMgvwTYyb4I0C3jI0C6x/LURasfyIfmVPNYuT19vjLSZEDzu+/I\niukIBoHYIQKBgCByyQVdh+HAE5PocTMB3t+rg7KYyz9iZlhUI4LPWCvFi845cRWW\nrM+B4cTsf3yyN6E2pBKV2AK8pSnW691HFahBE+cH3CCD5mbG7s5FwTtv2HKCcXew\nXuG1uXE19MLlAE7uLNWf2wGeFNegrkXJGgdgi3PkBDrT9Z6r4Mt10cfLAoGBAOjs\nvhEvVRvPDoMMLFiRCzj/9huTd0huj9Pc9HVef3Fs79K0f/obu5nNiH2xed6T+k2S\nsDTiL+GvaU0RKFnVnlsXt/H9iJ1D0IhQo+dmplIxTudNmVF/D582zAIUUyDd6noS\nrH8UajKtW4mAahi/MwLNdx3zcTow3f8TKMX8hZPBAoGBAMLuu1fYN/aqo7w+Mo1R\nLiNVGm0ROZ7KAhWE2UP6hcqRlRgW1qWZZSx1TfNn/Iiyva35Tw+JpH8WbqUogTS4\nctYPPB7usvjhKf1eBDsRUt47E7w2KDiySfJ5K/cBmJgj1NFAgiTGoUe4Aeoj9zUB\nOxi69z6eGcJ5PNsXUNPP4QQI\n-----END PRIVATE KEY-----\n",
    "client_email": "firestore-service@treeplanting-4254e.iam.gserviceaccount.com",
    "client_id": "107459333551331437936",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firestore-service%40treeplanting-4254e.iam.gserviceaccount.com"
  }
  
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
//const firebaseadmin = require('firebase-admin');

/*firebaseadmin.initializeApp({
    credential: firebaseadmin.credential.cert(serviceAccount)
});*/
  
let db = firebase.firestore();
export let Userdb = db.collection('Users')
export let Treedb = db.collection('Trees')

//export default CloudConfig;
/*export default {
    firebaseConfig,
    Userdb, 
    Treedb,
};*/
