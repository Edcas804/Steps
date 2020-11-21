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
let userProfileEdit = document.querySelector('#userProfileEdit');
//error
let errorAll = document.querySelector('#errorAll');
let modalError = document.querySelectorAll('.modalError')[0];

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
        toggleModals('x')
        userLogin.reset();
    });
    login.catch( error => {
         l(error);
         errorAll.innerHTML = error.message;
         toggleModals('MError', true)
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
                updateUserName(dataUser, userName, 'first');
            }
        });
        toggleModals('x');
        btnSingup.reset(); 
    });
    createNewUser.catch( e => {
        errorAll.innerHTML = e.message;
        toggleModals('MError', true);
    });
});
// update user imgage
let downloadURL;
const updateUserImg = () => {

    // let newStorageref = storage.ref('/userProfileImgs/' + newFilePhotoNew.name);
    // let uploadImg = newStorageref.put(newFilePhotoNew);
    let uploadImg = storage.ref('/userProfileImgs/' + newFilePhotoNew.name).put(newFilePhotoNew);

    // uploadImg.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot) => {
    uploadImg.on('state_changed', (snapshot) => { 
    }, (error) => {
        l(error);
    }, function(){
        uploadImg.snapshot.ref.getDownloadURL()
        .then(downloadURL => {
            l('la url de la foto es: ' + downloadURL);
            dataUser.updateProfile({
                photoURL: downloadURL
            })
            .then(() => {
                window.location.reload() 
            })
            .catch( error => {l(error)});
        })
        }
     
    );
}
// Update User Name
function updateUserName(dataUser, userName, source){
    if(source === 'first'){
        dataUser.updateProfile({
            displayName : userName,
        })
        .then(() => {
            l('user name update');  
            modalError.classList.add('bg-redOrange');
            errorAll.innerHTML = 'Guardando los cambios...';
            toggleModals('MError', true);
            updateUserImg();
        })
        .catch( error => {l(error)});
    }
    else if(source === 'update'){
        dataUser.updateProfile({
            displayName : userName,
        })
        .then(() => {
            l('user name update'); 
            modalError.classList.add('bg-redOrange');
            errorAll.innerHTML = 'Guardando los cambios...';
            toggleModals('MError', true);
            updateUserImg(); 
        })
        .catch( error => {l(error)});
        l('es una actualización');
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
            userProfileEdit.classList.remove('hide')
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
    newUserName.value = ` `;
    newUserEmal.value = ` `;
    NewUserAbout.value = ` `;
    userProfileEdit.classList.add('hide')
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
const sendNewChangePassword = () => {
    let mail = document.getElementById('emailForNewPassword').value;
    auth.sendPasswordResetEmail(mail)
    .then(()=> {
        l('Email enviado');
        modalError.classList.add('bg-redOrange');
        errorAll.innerHTML = `Se han enviado las instrucciones a tu correo ${mail}`;
        toggleModals('MError', true);
        setTimeout( () => {
            toggleModals('x', true);
            setTimeout(()=>{
                toggleModals('MLogin');
            }, 500)

        }, 5000)
    })
    .catch(error=> {
        l(error);
        errorAll.innerHTML = error.message;
        toggleModals('MError', true)
    })

}

// validando archivos subidos como foto de perfil

let filePhoto = document.querySelector('#filePhoto');
let filePhoto2 = document.querySelector('#filePhoto2');
let prevUserPhoto = document.querySelectorAll('.prevUserPhoto');
let newFilePhotoNew;
let newFilePhoto;
const newUserPhoto = (e, source) => {
    newFilePhotoNew = e.target.files[0];
    l(newFilePhotoNew.name, newFilePhotoNew.size, newFilePhotoNew.type);
    l(newFilePhotoNew);

    let allowedExt = /(.jpg|.png|.jpeg|.svg)$/i;
    
    if(source === 'update'){
        newFilePhoto = filePhoto2.value;
        if(!allowedExt.exec(newFilePhoto)){
            errorAll.innerHTML = `
            La extensión del archivo que estás intentando subir no es valida,
             solo se admiten archivos tipo 
             <p class="bg-redOrange border-r pad-2 d-inline">.jpg </p>
             <p class="bg-redOrange border-r pad-2 d-inline">.png </p>
             <p class="bg-redOrange border-r pad-2 d-inline">.jpeg </p>
            `;
            toggleModals('MError', true)
            filePhoto.value = '';
    
        }
        else {
            if(filePhoto2.files && filePhoto2.files[0]){
                let visor = new FileReader();
                visor.onload = function(e){
                    // document.querySelector('#prevUserPhoto').src = `${e.target.result}`;
                    prevUserPhoto.forEach( photo => {photo.src = `${e.target.result}`})
                }
                visor.readAsDataURL(filePhoto2.files[0]);
            }
        }
    }
    else{
        newFilePhoto = filePhoto.value;
        if(!allowedExt.exec(newFilePhoto)){
            errorAll.innerHTML = `
            La extensión del archivo que estás intentando subir no es valida,
             solo se admiten archivos tipo 
             <p class="bg-redOrange border-r pad-2 d-inline">.jpg </p>
             <p class="bg-redOrange border-r pad-2 d-inline">.png </p>
             <p class="bg-redOrange border-r pad-2 d-inline">.jpeg </p>
            `;
            toggleModals('MError', true)
            filePhoto.value = '';
    
        }
        else {
            if(filePhoto.files && filePhoto.files[0]){
                let visor = new FileReader();
                visor.onload = function(e){
                    // document.querySelector('#prevUserPhoto').src = `${e.target.result}`;
                    prevUserPhoto.forEach( photo => {photo.src = `${e.target.result}`})
                }
                visor.readAsDataURL(filePhoto.files[0]);
            }
        }
    }

    

}


