document.querySelector('#google-login').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.addScope('https://www.googleapis.com/auth/user.gender.read');
    provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(result);
            document.querySelector('span').innerText = result.credential.accessToken;
            fetch('https://people.googleapis.com/v1/people/me?personFields=genders,names,relations,emailAddresses,birthdays', {
                method: 'GET', headers: new Headers({ 'Authorization': `Bearer ${result.credential.accessToken}`})
            })
                .then(result => result.json())
                .then(json => console.log(json));
        }).catch(err => {
            alert('Erro ao logar');
            console.log(err);
        });
});
