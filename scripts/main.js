let l = console.log;
const activeWindow = (activeWindow) => {
    let windowView = document.querySelectorAll('.window');

    windowView[0].classList.add('hide');
    windowView[1].classList.add('hide');
    windowView[2].classList.add('hide');

    document.querySelector(`#${activeWindow}`).classList.remove('hide');
    animationWin(activeWindow);
    animationWin2(activeWindow)
}
function animationWin(win){
    let AppItem = document.querySelectorAll('.AppItem');
    if(win === 'app'){
        setTimeout(()=>{
                AppItem[0].classList.remove('transtaleL');
                AppItem[1].classList.remove('transtaleT');
                AppItem[2].classList.remove('transtaleR');
        }, 50);
    }
    else{
        AppItem[0].classList.add('transtaleL');
        AppItem[1].classList.add('transtaleT');
        AppItem[2].classList.add('transtaleR');
    }

}
function animationWin2(win){
    let dinamicJs = document.querySelectorAll('.dinamicJs');
    if( win === 'about'){
        setTimeout(()=>{
            for(let i = 0; i < dinamicJs.length; i++){
                dinamicJs[i].classList.remove('transtaleT');
                dinamicJs[i].classList.remove('transtaleR');
                dinamicJs[i].classList.remove('transtaleL');
            }
        }, 50);
    }
    else{
        dinamicJs[0].classList.add('transtaleT');
            dinamicJs[1].classList.add('transtaleR');
            dinamicJs[2].classList.add('transtaleL');
        
    }

}
activeWindow('app');
// let menu = true;
// let showLogin = true;
// let showRegister = true;
// let showuserInformation = true;
// let showmodalError = true;
let menu, showLogin, showRegister, showuserInformation, showmodalError = true;
let wrapperMenu = document.getElementsByClassName('wrapperMenu')[0];
let modalLogin = document.getElementsByClassName('modalLogin')[0];
let modalRegister = document.getElementsByClassName('modalRegister')[0];
let userInformation = document.getElementsByClassName('userInformation')[0];
let modalError = document.getElementsByClassName('modalError')[0];

const activeModal = (modal) => {
    if(modal === 'wrapperMenu'){
        if(menu){
            showModal(wrapperMenu);
            menu = false;
        }else{
            hiddeModal(wrapperMenu); 
            menu = true}
    }
    if(modal === 'modalLogin'){   
        if(showLogin){
            showModal(modalLogin);
            showLogin = false;
        }else{
            hiddeModal(modalLogin); 
            showLogin = true}
    }
    if(modal === 'modalRegister'){   
        if(showRegister){
            showModal(modalRegister);
            showRegister = false;
        }else{
            hiddeModal(modalRegister); 
            showRegister = true}
    }            
    if(modal === 'userInformation'){   
        if(showuserInformation){
            showModal(userInformation);
            showuserInformation = false;
        }else{
            hiddeModal(userInformation); 
            showuserInformation = true}
    }         
    if(modal === 'modalError'){   
        if(showmodalError){
            showModal(modalError, 'modal2');
            showmodalError = false;
        }else{
            hiddeModal(modalError, 'modal2'); 
            showmodalError= true}
    }           
}
const showModal = (modal, modal2) => {
    if(modal2 === 'modal2'){
            modal.classList.add('top5');
    }
    else{
        modal.classList.add('top0');
    }
}
const hiddeModal = (modal, modal2) => {
    if(modal2 === 'modal2'){
            modal.classList.remove('top5');
    }
    else{
        modal.classList.remove('top0');
    }
}

// modals for add new data
let newdata = true;
let newasideMenu = true;
let newasideNotes = true;
let newDataModal = document.getElementsByClassName('newDataModal')[0];
let asideMenu = document.getElementsByClassName('asideMenu')[0];
let asideNotes = document.getElementsByClassName('asideNotes')[0];
const ShowAddNewCode = (modal) => {
    if(modal === 'newDataModal'){
        if(newdata){
            showModal(newDataModal, 'modal2');
            newdata = false;
        }else{
            hiddeModal(newDataModal, 'modal2');
            newdata = true}
    }
    if(modal === 'asideMenu'){
        if(newasideMenu){
            showModal(asideMenu, 'modal2');
            newasideMenu = false;
        }else{
            hiddeModal(asideMenu, 'modal2');
            newasideMenu = true}
    }
    if(modal === 'asideNotes'){
        if(newasideNotes){
            showModal(asideNotes, 'modal2');
            newasideNotes = false;
        }else{
            hiddeModal(asideNotes, 'modal2');
            newasideNotes = true}
    }
}
let timeOut;
const writeTitle = () => {
    let message = '  The only limit is you                         ';
    let titleMain = document.querySelector('#titleMain');
    let num = 0; 
    timeOut = setInterval(write, 130);
    function write(){
        if(num >= message.length -1){
            num = 0;
            titleMain.innerHTML = '';
        }
        else{
            ++num;
            titleMain.innerHTML += message[num];
        }

    }    
}
writeTitle();

// upload profile photo user
let files = document.querySelector('#files');
let write = document.querySelectorAll('.list')[0];
const uploadFile = (evt) => {
    let file = evt.target.files;
    let dataFile = [];
    for ( let i = 0, f; f = file[i]; i++){
      dataFile.push(f.name, f.size, f.type);
    }
     console.log(dataFile);
     console.log(file);
     return write.innerHTML = 'Se subío el archivo';
}
files.addEventListener('change', uploadFile);


let inputColor = document.querySelector('#inputColor');
let root = document.documentElement;
const watchColor = e => {
    let color= e.target.value;
    root.style.setProperty('--hight-color', color);
}
inputColor.addEventListener('input', watchColor, false);

  
