
let allModals = document.querySelectorAll('.allModals');
let allModals2 = document.querySelectorAll('.allModals2');
const toggleModals = (modal, back) => {
    if(back){
        allModals2.forEach(modals => {modals.classList.remove('Show')});
        
        if(modal != 'x'){
            document.querySelector(`#${modal}`).classList.add('Show');
        }
    }
    else{
        allModals.forEach(modals => {modals.classList.remove('Show')});

        if(modal != 'x'){
            document.querySelector(`#${modal}`).classList.add('Show');
        }
    }
}
// toggleModals('MChangePassword', true);



let l = console.log;
moment.locale('en');

let format = 'LL';
let newDate = moment().format( format );
let Datehour = moment().format('LT');
setInterval(()=> {
    newDate = moment().format( format );
    Datehour = moment().format('LT');
}, 60000);

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
activeWindow('home');

// modals for add new 
let newasideMenu = true;
let newasideNotes = true;
let asideMenu = document.getElementsByClassName('asideMenu')[0];
let asideNotes = document.getElementsByClassName('asideNotes')[0];
let allAsides = document.querySelectorAll('.allAsides');
const ShowAddNewCode = (Menu) => {
    allAsides.forEach( aside => aside.classList.remove('top0'));
    if(Menu != 'x'){
        document.querySelector(`#${Menu}`).classList.add('top0');
    }
}
ShowAddNewCode('asideNotes');
let MainUserProfile = document.getElementsByClassName('MainUserProfile')[0];
let UpdateUserProfile = document.getElementsByClassName('UpdateUserProfile')[0];
let editB = true;
const ShowHiddeUserEdit = () => {
    if(editB){
        MainUserProfile.classList.add('hide');
        UpdateUserProfile.classList.remove('hide');
        editB = false;
    }else{
        MainUserProfile.classList.remove('hide');
        UpdateUserProfile.classList.add('hide');
        editB = true;
    }

}

// document.querySelector('#clickk').click();

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

let inputColor = document.querySelector('#inputColor');
let root = document.documentElement;
const watchColor = e => {
    let color= e.target.value;
    root.style.setProperty('--hight-color', color);
}
inputColor.addEventListener('input', watchColor, false);

let appBo = true;
let App = document.querySelectorAll('.App')[0];
let showHideAll = document.querySelectorAll('.showHideAll');
const hiddeShowNotes = () => {
    if(appBo){
        App.classList.add('AppHideShow');
        showHideAll.forEach( item => {item.classList.add('hide')});
        asideNotes.classList.add('newForHiddeShow');
        appBo = false;
    }else{
        App.classList.remove('AppHideShow');
        showHideAll.forEach( item => {item.classList.remove('hide')});
        asideNotes.classList.remove('newForHiddeShow');
        appBo = true;
    }
}
// capturando eventos de teclado
let numRows= 1;
document.getElementById('code').addEventListener('keydown', (e) => {
   if(e.keyCode === 13){
       numRows++;
   }
}, false);
let BShort = true;
let BAdd = true;

document.addEventListener('keydown', (e) => {   
    // l(e.keyCode)
    if(e.altKey && e.keyCode === 78){    //alt + n
        if(BAdd){toggleModals('MDataModal'); BAdd = false }
        else{toggleModals('x'); BAdd = true} 
          
    }
    if(e.altKey && e.keyCode === 66){    //alt + b
        searchTags();
    }
    if(e.altKey && e.keyCode === 72){    //alt + h
        hiddeShowNotes();
    }
    if(e.altKey && e.keyCode === 71){    //alt + g
        if(BShort){toggleModals('MShorCuts'); BShort = false }
        else{toggleModals('x'); BShort = true} 
    }
 }, false);


     
 

