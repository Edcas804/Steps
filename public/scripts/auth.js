// butons
let btnLogin = document.querySelector('#btnLogin');
let btnLogOut = document.querySelector('#btnLogOut');
// signup
let btnSingup = document.querySelector('#btnSingup');    
let newName = btnSingup['newName'];
let newEmail = btnSingup['newEmail'];
let newPassword = btnSingup['newPassword'];
let newDescriptionUser = btnSingup['newDescriptionUser'];
// login
let userLogin = document.querySelector('#userLogin'); 
let loginEmail = userLogin['userLoginEmail'];
let loginPassword = userLogin['userLoginPassword'];
// global
const auth = firebase.auth();
let activeUser = false;
// userProfile
let userDisplayName = document.querySelector('#userDisplayName');
let photoUserLog = document.querySelector('#photoUserLog');
let errorMensaje = document.querySelector('#errorMensaje');
//error
let errorAll = document.querySelector('#errorAll');

let userId;

// login anonnymous
const onloadDocument = () => {
    anonymous();
}
const anonymous = () => {
    if(!activeUser){
        auth.signInAnonymously()
        .then(function(){
              l('user anonimo') 
            })
          .catch(function(error) {
            var errorCode = error.code;   
            var errorMessage = error.message;
          });  
    } 
} 

userLogin.addEventListener('submit', e => {
    e.preventDefault();
    let logEmail = loginEmail.value;
    let logPassword = loginPassword.value;
    let login = auth.signInWithEmailAndPassword(logEmail, logPassword);
    login.then( () => {
        l('logueado');        
        activeModal('modalLogin');
        userLogin.reset();
    });
    login.catch( error => {
         l(error);
         errorAll.innerHTML = error.message;
         activeModal('modalError');
    });

});
btnSingup.addEventListener('submit', e => {
    e.preventDefault();
    let userName = newName.value;
    let userEmail = newEmail.value;
    let userPassword = newPassword.value;
    
    const createNewUser = auth.createUserWithEmailAndPassword(userEmail, userPassword);
    createNewUser.then(() => {
        activeModal('modalRegister');
        activeModal('modalLogin');
        btnSingup.reset();  
        firebase.auth().onAuthStateChanged( firebaseUser => {
            if(firebaseUser.displayName == null){
                l('no existe el nombre');
                updateUserName(firebaseUser, userName);
            }
        });
    });
    createNewUser.catch( e => {
        errorAll.innerHTML = e.message;
        activeModal('modalError');
    });
});
// Update User Name
function updateUserName(firebaseUser, userName){
    firebaseUser.updateProfile({
        displayName : userName 
    })
    .then(() => {l('user name update')})
    .catch( error => {l(error)});
}
let dataUser;
auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        if(firebaseUser.displayName){
            userDisplayName.innerHTML = `${firebaseUser.displayName} `;  
            userId = firebaseUser.uid; 
            dataUser = firebaseUser;
            errorMensaje.innerHTML = ''; 
            btnLogin.classList.add('hide');
            btnLogOut.classList.remove('hide');
            activeUser = true;
            showStepsList();
            db.collection('Steps').doc(userId).set({name: firebaseUser.displayName});
            if(firebaseUser.photoURL){photoUserLog.src = firebaseUser.photoURL}
            else{photoUserLog.src = 'img/profile/profile.png';}
            
        }
        if(firebaseUser.isAnonymous){
            errorMensaje.innerHTML = 'Aún no has iniciado sesión';
            l('is anonymous')
        }
    }
    else{
        userDisplayName.innerHTML = '';     
        errorMensaje.innerHTML = 'Aún no has iniciado sesión';    
        errorMensaje.style.color = '#fff'; 
        btnLogOut.classList.add('hide');
        btnLogin.classList.remove('hide');
    }

});
btnLogOut.addEventListener('click', e =>{
     auth.signOut();   
     activeModal('wrapperMenu');
     activeUser = false;
     anonymous();
     userId = '';
     dataFromDb.innerHTML = ``;
     itemStepsList.innerHTML = ``;
     photoUserLog.src = 'img/profile/profile.png';
     allTitleSteps.value = `No has iniciado sesión `;
});


document.onload = onloadDocument();

// agregando autentcicación con google
// let loginGoogle = document.querySelector('#loginGoogle');
// loginGoogle.addEventListener( 'click', () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//     .then( result => {
//         l(result)
//     })
//     .catch( error => {
//         l(error)
//     })
// });

let loginGoogle = document.querySelector('#loginGoogle');
loginGoogle.addEventListener( 'click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

});


