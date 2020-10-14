// butons
let btnLogin = document.querySelector('#btnLogin');
let btnLogOut = document.querySelector('#btnLogOut');
// signup
let btnSingup = document.querySelector('#btnSingup');    
let newName = btnSingup['newName'];
let newEmail = btnSingup['newEmail'];
let newPassword = btnSingup['newPassword'];
let newDescription = btnSingup['newDescription'];
let errorRegister = document.querySelector('#errorRegister');
// login
let userLogin = document.querySelector('#userLogin'); 
let loginEmail = userLogin['userLoginEmail'];
let loginPassword = userLogin['userLoginPassword'];
// global
const auth = firebase.auth();
// userProfile
let userDisplayName = document.querySelector('#userDisplayName');
let errorMensaje = document.querySelector('#errorMensaje');

let userId;

// login anonnymous
const anonymous = () => {
    l('anonimo')
    auth.signInAnonymously()
    .then(function(){
          l('user anonimo') 
        })
      .catch(function(error) {
        var errorCode = error.code;   
        var errorMessage = error.message;
      });   
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
         errorLogin.innerHTML = error.message;
    });

});
btnSingup.addEventListener('submit', e => {
    e.preventDefault();
    let userName = newName.value;
    let userEmail = newEmail.value;
    let userPassword = newPassword.value;
    
    // const auth = firebase.auth();
    const createNewUser = auth.createUserWithEmailAndPassword(userEmail, userPassword);
    createNewUser.then(() => {
        activeModal('modalRegister');
        activeModal('modalLogin');
        btnSingup.reset();
        l('registrado');
        firebase.auth().onAuthStateChanged( firebaseUser => {
            if(firebaseUser.displayName == null){
                l('no existe el nombre');
                updateUserName(firebaseUser, userName);
            }
        });
    });
    createNewUser.catch( e => {
        errorRegister.innerHTML = e.message;
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

auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        if(firebaseUser.displayName){
            userDisplayName.innerHTML = firebaseUser.displayName;  
            userId = firebaseUser.uid; 
            errorMensaje.innerHTML = ''; 
            btnLogin.classList.add('hide');
            btnLogOut.classList.remove('hide');
            l(userId);
        }
        if(firebaseUser.isAnonymous){
            l(firebaseUser.isAnonymous);
            l('is anonymous')
        }
    }
    else if(firebaseUser === null){
        userDisplayName.innerHTML = '';     
        errorMensaje.innerHTML = 'Debes iniciar';     
        btnLogOut.classList.add('hide');
        btnLogin.classList.remove('hide');
            // if(firebaseUser.isAnonymous){
            //     l('es anonimo')
            // }
    }
    else{  
        userDisplayName.innerHTML = '';     
        errorMensaje.innerHTML = 'Aún no has iniciado sesión';         
        btnLogOut.classList.add('hide');
        btnLogin.classList.remove('hide');
    }
});
btnLogOut.addEventListener('click', e =>{
     auth.signOut();   
     activeModal('wrapperMenu');
     l(userId)
});








    let newDate = moment().format('lll');
    let code = `
        const task = () => {
            To do;
            return something;
        }
    `;


    const writeCode = (e) => {
        e.preventDefault();
    }
    let newItemCode = document.querySelector('#newItemCode'); 
    let titleNewItem = newItemCode['titleNewItem'];
    let description = newItemCode['description'];
    let newCode = newItemCode['code'];

    newItemCode.addEventListener('submit', writeCode);

    let datos = {
        title: 'Fist item',
        code: code,
        date: newDate,
        description: 'Esta linea muestra un ejemplo de como funcionará el programa',
    }
    let insertCode = document.querySelector('#dataFromDb');
    let allData;
    const data = () => {
        for(let i = 0; i < 5; i++){
            allData = `   
            <div class="wrapperData">
                <header class="dataHeader">
                    <h4>${datos.title}</h4>
                    <ul>
                        <li><i class="material-icons delete">&#xe872;</i></li>
                        <li><i class="material-icons edit">&#xe3c9;</i></li>
                    </ul>
                </header>
                <div class="wrapperCode" > 
                    <button class="copy" onclick="copyData()">
                        <i class="material-icons">&#xe14d;</i>
                    </button>         
                    
                    <textarea class="code"  id="innerCode"   rows="5" >${datos.code}</textarea>
                    <p class="description">
                        ${datos.description}
                    </p>
                </div>
                <div> 
                    <p class="details">
                    Actualizado el  ${datos.date}           
                    </p>
                </div>
            </div>
            `;
            insertCode.innerHTML += allData ;
        }
    }
    data();
    const copyData = () => {
        let innerCode = document.querySelector('#innerCode');
        let copyDataCode = innerCode.value;
        console.log(copyDataCode)     
    }


    let allTags= [1, 2, 3];
    const addNewTag = () => {
        let tag = document.querySelector('#tag');
        let newTag = tag.value;
        if(newTag !== ''){
            allTags.push(newTag);
        }
        tag.value= '';
        return forArray();

    }
    let insertTags = document.querySelector('#insertTags');
    const forArray = () => {
        insertTags.innerHTML = '';
        allTags.forEach(function(element, index, array){
             insertTags.innerHTML += `
                 <p>${element}</p>
             `; 
        });

    }
