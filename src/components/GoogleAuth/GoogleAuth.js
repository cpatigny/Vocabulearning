import React from 'react';

import firebase from 'firebase/app';
import firebaseApp from '../../firebase';
import 'firebase/auth';

const GoogleAuth = () => {
  const googleAuthenticate = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithRedirect(provider);
    firebaseApp.auth().getRedirectResult()
      .then(result => {
        console.log('ok');
        if (result.credential) {
          // gives a Google Access Token that can be used to access the Google API.
          const token = result.credential.accessToken;
        }
        // the signed-in user info
        let user = result.user;
        console.log(user);
      }).catch(error => {
        console.log('bruh');
        console.log({
          code: error.code,
          message: error.message,
          email: error.email,
          credential: error.credential,
        });
      });
  }

  return <button onClick={googleAuthenticate}>S'inscrire avec google</button>;
}

export default GoogleAuth;
