import { DB_Firestore, auth } from "services/firebase/setup";

export function watcherUserChanges(callback) {
  const unsub = auth.onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      callback({
        id: user.uid,
        email: user.email,
      });
    } else {
      console.log("Not Logged in");
      callback(null);
    }
  });
  return unsub;
}

export function watcherBrands(callback) {
  const unsub = DB_Firestore.collection("brands")
    .get()
    .then((snapshot) => {
      const brands = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.data();
        brands.push({
          ...data,
          id: childSnapshot.id,
        });
      });
      callback(brands);
    });
  return unsub;
}

export function watcherProducts(callback) {
  const unsub = DB_Firestore.collection("products")
    .get()
    .then((snapshot) => {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.data();
        products.push({
          ...data,
          id: childSnapshot.id,
        });
      });
      callback(products);
    });
  return unsub;
}

export function watcherProductChanges(callback) {
  let product = {};
  const unsub = DB_Firestore.collection("products")
    .where("selected", "==", true)
    .onSnapshot((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.data();
        product = {
          ...data,
          id: childSnapshot.id,
        };
      });
      callback(product);
    });
  return unsub;
}

export function watcherProductColors(id, callback) {
  let colors = [];
  const unsub = DB_Firestore.collection("products")
    .doc(`${id}`)
    .collection("colors")
    .get()
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.data();
        colors.push({
          ...data,
          id: childSnapshot.id,
        });
      });
      callback(colors);
    });
  return unsub;
}

export function watcherShoppingCartChanges(idUser, callback) {
  let productsShoppingCart = [];
  const shoppingCartRef = DB_Firestore.collection("users")
    .doc(`cart_${idUser}`)
    .collection("products_shoppingCart");
  const unsub = shoppingCartRef.onSnapshot((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.data();
      productsShoppingCart.push({
        ...data,
        id: childSnapshot.id,
      });
    })
    callback(productsShoppingCart);
  }, (error) => {
    console.log(error)
  });
  return unsub;
}
