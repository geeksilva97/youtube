document.querySelector('#facebook-login').addEventListener('click', () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  provider.addScope('user_gender');
  provider.addScope('email');
  
  firebase.auth().signInWithPopup(provider).then(result => console.log({result}))
    .catch(err => {
      console.log({err});
    });
});

// document.querySelector('#logout').addEventListener('click', () => {
//   firebase.auth().signOut();
// });