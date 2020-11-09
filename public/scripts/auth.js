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
            db.collection('Steps').doc(userId).set({name: firebaseUser.displayName})
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
     collecionListSelec.innerHTML = ``;
});


document.onload = onloadDocument();