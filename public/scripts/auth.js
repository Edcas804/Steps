// butons
let btnLogin = document.querySelectorAll('.btnLogin');
let btnLogOut = document.querySelectorAll('.btnLogOut');
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
let userDisplayName = document.querySelectorAll('.userDisplayName');
let photoUserLog = document.querySelectorAll('.photoUserLog');
let userPhotoMain = document.querySelector('#userPhotoMain');
let userPhotoMain2 = document.querySelector('#userPhotoMain2');
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
    let userEmail = newEmail.value;
    let userPassword = newPassword.value;
    let userName = newName.value;
    
    const createNewUser = auth.createUserWithEmailAndPassword(userEmail, userPassword);
    createNewUser.then(() => { 
        firebase.auth().onAuthStateChanged( firebaseUser => {
            if(firebaseUser.displayName == null){
                dataUser = firebaseUser;
                l('no existe el nombre');
                // updateUserImg();
                updateUserName(dataUser, userName, 'first');
            }
        });
        activeModal('modalRegister');
        activeModal('modalLogin');
        btnSingup.reset(); 
    });
    createNewUser.catch( e => {
        errorAll.innerHTML = e.message;
        activeModal('modalError');
    });
});
// update user imgage
let downloadURL;
const updateUserImg = () => {
    let userName = newName.value;

    let newStorageref = storage.ref('/userProfileImgs/' + newFilePhotoNew.name);
    let uploadImg = newStorageref.put(newFilePhotoNew);

    uploadImg.on('state_changed', (snapshot) => {

    }, (error) => {
        l(error);
    }, () => {
        l('se subío el archivo.');
        downloadURL = uploadImg.snapshot.downloadURL;
        dataUser.updateProfile({
            photoURL: downloadURL
        })
        .then(() => {l('user name update and img');
        })
        .catch( error => {l(error)});
    }
     
    );

}
// Update User Name
function updateUserName(dataUser, userName, source){
    if(source === 'first'){
        dataUser.updateProfile({
            displayName : userName,
        })
        .then(() => {l('user name update'); LogOutMain()})
        .catch( error => {l(error)});
    }
    else if(source === 'update'){
        l('es una actualización')
    }
}
auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        if(firebaseUser.displayName){
            userId = firebaseUser.uid; 
            dataUser = firebaseUser;
            errorMensaje.innerHTML = ''; 
            activeUser = true;
            showStepsList();
            userDisplayName.forEach( p => { p.innerHTML = `${firebaseUser.displayName}`}) 
            btnLogin.forEach(b => {b.classList.add('hide')});
            btnLogOut.forEach(b => {b.classList.remove('hide')});
            newUserName.value = firebaseUser.displayName;
            newUserEmal.value = firebaseUser.email;
            NewUserAbout.value = 'about';
            allTitleSteps.value = `Hola ${firebaseUser.displayName}`;
            db.collection('Steps').doc(userId).set({name: firebaseUser.displayName});
            
            if(firebaseUser.photoURL){
                photoUserLog.forEach(photo => {photo.src = firebaseUser.photoURL});
            }
            else{
                photoUserLog.forEach(photo => {photo.src = 'img/profile/user.svg'});
            }
            
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
        // btnLogOut.classList.add('hide');
        // btnLogin.classList.remove('hide');
        btnLogin.forEach(b => {b.classList.remove('hide')});
        btnLogOut.forEach(b => {b.classList.add('hide')});
        photoUserLog.forEach(photo => {photo.src = 'img/profile/user.svg'});
    }

});
const LogOutMain = () => {
    auth.signOut();   
    activeUser = false;
    anonymous();
    userId = '';
    dataFromDb.innerHTML = ``;
    itemStepsList.innerHTML = ``;
    userDisplayName.forEach( p => { p.innerHTML = ``}) 
    photoUserLog.src = 'img/profile/profile.png';
    allTitleSteps.value = `No has iniciado sesión `;
}

document.onload = onloadDocument();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const loginWithGoogle = (provider) => {
    l('entramos');
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        }
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

}

// validando archivos subidos como foto de perfil

let filePhoto = document.querySelector('#filePhoto');
let newFilePhotoNew;
const newUserPhoto = (e) => {
    let newFilePhoto = filePhoto.value;
    newFilePhotoNew = e.target.files[0];
    l(newFilePhotoNew.name, newFilePhotoNew.size, newFilePhotoNew.type);
    l(newFilePhotoNew);
    let allowedExt = /(.jpg|.png|.jpeg|.svg)$/i;

    if(!allowedExt.exec(newFilePhoto)){
        errorAll.innerHTML = `
        La extensión del archivo que estás intentando subir no es valida,
         solo se admiten archivos tipo 
         <p class="bg-redOrange border-r pad-2 d-inline">.jpg </p>
         <p class="bg-redOrange border-r pad-2 d-inline">.png </p>
         <p class="bg-redOrange border-r pad-2 d-inline">.jpeg </p>
        `;
        activeModal('modalError');
        filePhoto.value = '';

    }
    else {
        if(filePhoto.files && filePhoto.files[0]){
            let visor = new FileReader();
            visor.onload = function(e){
                document.querySelector('#prevUserPhoto').src = `${e.target.result}`;
            }
            visor.readAsDataURL(filePhoto.files[0]);
        }
    }

}


