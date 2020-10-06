
let l = console.log;
const activeWindow = (activeWindow) => {
    let windowView = document.querySelectorAll('.window');

    windowView[0].classList.add('hide');
    windowView[1].classList.add('hide');

    document.querySelector(`#${activeWindow}`).classList.remove('hide');
}
activeWindow('app');
let menu = true;
let showLogin = true;
let showRegister = true;
let wrapperMenu = document.getElementsByClassName('wrapperMenu')[0];
let modalLogin = document.getElementsByClassName('modalLogin')[0];
let modalRegister = document.getElementsByClassName('modalRegister')[0];
const activeModal = (modal, bole) => {
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
}
const showModal = (modal) => {
    modal.classList.add('top0');
}
const hiddeModal = (modal) => {
    modal.classList.remove('top0');
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