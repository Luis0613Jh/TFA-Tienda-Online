import firebase from "firebase";
import * as firebaseui from "firebaseui";
import { FIREBASE_CONFIG } from 'config/firebase_config'

export const UI_CONFING = {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();
export const DB_Firestore = firebase.firestore();

export const startUI = (elementId) => {
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start(elementId, UI_CONFING);
}
