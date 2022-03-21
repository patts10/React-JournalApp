import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { types } from "../types/types"

export const startLoginEmailPassword = ( email, password ) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch( login('123', 'Jona'))
    }, 3500);
  }
};

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