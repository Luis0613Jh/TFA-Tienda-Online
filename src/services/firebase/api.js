import firebase from "firebase";
import { DB_Firestore, auth } from "services/firebase/setup";

export function registerUser() {
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;
  console.log(`${email} --> ${password}`);
  auth.createUserWithEmailAndPassword(email, password).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
  });
}

export function loginUser() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  console.log(`${email} --> ${password}`);
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
  });
}

export function logoutUser() {
  auth.signOut().then(
    () => {
      console.log("Signed Out");
    },
    (error) => {
      console.error("Sign Out Error", error);
    }
  );
}

export function userAddToCart(product, idUser) {
  const {
    amount,
    category,
    color,
    description,
    id,
    img,
    price,
    size,
    stock,
  } = product;
  const cartRef = DB_Firestore.collection("users").doc(`cart_${idUser}`);
  const shoppingCartRef = cartRef
    .collection("products_shoppingCart")
    .doc(`${id}`);
  shoppingCartRef
    .set({
      amount,
      category,
      color,
      description,
      img,
      price,
      size,
      stock,
    })
    .then(function () {
      console.log("Document created successfully!");
    })
    .catch(function (error) {
      console.error("Error created document: ", error);
    });
}

export function deleteShoppingCart(idUser, idProduct) {
  const shoppingCartRef = DB_Firestore.collection("users")
    .doc(`cart_${idUser}`)
    .collection("products_shoppingCart")
    .doc(`${idProduct}`);
  shoppingCartRef.update({
    amount: firebase.firestore.FieldValue.delete(),
    category: firebase.firestore.FieldValue.delete(),
    color: firebase.firestore.FieldValue.delete(),
    description: firebase.firestore.FieldValue.delete(),
    img: firebase.firestore.FieldValue.delete(),
    price: firebase.firestore.FieldValue.delete(),
    size: firebase.firestore.FieldValue.delete(),
    stock: firebase.firestore.FieldValue.delete(),
  });
}
export function deleteShoppingCartDoc(idUser, idProduct) {
  const shoppingCartRef = DB_Firestore.collection("users")
    .doc(`cart_${idUser}`)
    .collection("products_shoppingCart")
    .doc(`${idProduct}`);
  shoppingCartRef
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
