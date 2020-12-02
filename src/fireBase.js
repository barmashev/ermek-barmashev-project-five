import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBBoEtrfjmtRJRv0j8t4WqnHxChAJFj27M",
  authDomain: "playlist-app-546b1.firebaseapp.com",
  databaseURL: "https://playlist-app-546b1.firebaseio.com",
  projectId: "playlist-app-546b1",
  storageBucket: "playlist-app-546b1.appspot.com",
  messagingSenderId: "1047764386428",
  appId: "1:1047764386428:web:567943af38f860316bbff9",
};

firebase.initializeApp(config);

export default firebase;
