import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { types } from "../types/types"

export const startLoginEmailPassword = ( email, password ) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( ({ user }) => {
        dispatch(login( user.uid, user.displayName ));
      })
  }
};

export const startWithRegisterEmailPasswordName = ( name, email, password ) => {

  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword( email, password )
      .then( async({ user }) => {

        await user.updateProfile( {displayName: name} );

        dispatch( login( user.displayName, user.displayName ));
      })
      .catch( e => 
        console.log(e)); 
  }
} 

export const startGoogleLogin = () => {
  return ( dispatch ) => {

    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({ user }) => {
        dispatch( login( user.uid, user.displayName))
      })

  }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
      uid,
      displayName
    }
})