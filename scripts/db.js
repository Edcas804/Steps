  
  let db = firebase.firestore();
  let newDataUser= db.collection('Steps');

  let newcollecionList, newTitleNewItem, newNewCode, newDescription, convertRows;   
  let newItemCode = document.querySelector('#newItemCode'); 
  let collecionListSelec = newItemCode['collecionListSelec'];
  let addCollection = newItemCode['addCollection'];
  let titleNewItem = newItemCode['titleNewItem'];
  let newCode = newItemCode['code'];
  let description = newItemCode['description'];
  let allTags= [];
    
 
  let AddNewCheck = document.querySelector('#AddNewCheck');   
  let thisCheck = document.querySelector('#thisCheck');   
  let defaultCLickRadio = document.querySelector('#defaultCLickRadio'); 
  let showContentSelectNew = document.querySelector('#showContentSelectNew');
  let showContentSelectList = document.querySelector('#showContentSelectList');
  let showContentSelectThis = document.querySelector('#showContentSelectThis');
  const updatecollectionList = (action, e) => {
      if(action === 'new'){
          showContentSelectNew.classList.remove('hide');
          showContentSelectList.classList.add('hide');
          showContentSelectThis.classList.add('hide');
      }
      else if(action === 'this'){
          showContentSelectNew.classList.add('hide');
          showContentSelectList.classList.add('hide');
          showContentSelectThis.classList.remove('hide');
        newcollecionList = ThisCollection.value;          
      }
      else if(action === 'select'){
        showContentSelectNew.classList.add('hide');
        showContentSelectList.classList.remove('hide');
        showContentSelectThis.classList.add('hide');
        newcollecionList = collecionListSelec.value;   
      }
}
// let numForIncrem;
// let numIncrem = newDataUser.doc(userId).collection('stepsList').doc(docId);
//     numIncrem.get().then((doc) => { contador = doc.data().num; });

const writeCode = (e) => {
    e.preventDefault();
    
    
    convertRows = numRows;
    
    if(addCollection.value){newcollecionList = addCollection.value; }
    if(defaultCLickRadio.checked){newcollecionList = collecionListSelec.value; }
    if(newCode.cheked){newcollecionList = ThisCollection.value}
    
    newTitleNewItem = titleNewItem.value;
    newNewCode = newCode.value;
    newDescription = description.value;
    dateeee = 'November 1, 2019 1:23 PM';
    // newDate = moment(dateeee).format(format); 
    // Datehour = moment().format('LT'); 
    let AllData = {
        newTitleNewItem,
        newNewCode,
        newDescription,
        allTags,
        date: {newDate, Datehour},
        convertRows,
    };
    numRows = 1;
    return addnewData(newcollecionList, newTitleNewItem, AllData);
    
}
const addnewData = (newcollecionList, newTitleNewItem, AllData) => {
    
    if(userId){
        newDataUser.doc(userId).collection('stepsList').doc(newcollecionList).set({Title: newTitleNewItem});
        newDataUser.doc(userId).collection('stepsList').doc(newcollecionList).collection('eachStepsList').doc(newTitleNewItem)
        .set(AllData)
        .then(() => {    
            newItemCode.reset();
            ShowAddNewCode('newDataModal');
            l('Registrado')
        })
        .catch( error => {l(error)});            
        allTags = [];
        insertTags.innerHTML =  ``;
    }else{
        errorAll.innerHTML = 'Debes inciar sesión o crear una cuenta para poder guardar los cambios';
        activeModal('modalError');
    }
}
newItemCode.addEventListener('submit', writeCode);

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


let itemStepsList = document.querySelector('#itemStepsList');
let ThisCollection = document.querySelector('#ThisCollection');
let dataFromDb = document.querySelector('#dataFromDb');
let SelectCollectionActive = document.querySelector('#SelectCollectionActive');
let allData;
let deleteCollection = false;
// let buttonStepsList = document.querySelectorAll('.buttonStepsList');
const showStepsList = () => {
    newDataUser.doc(userId).collection('stepsList')
    .onSnapshot((querySnapshot) => {
        itemStepsList.innerHTML = ``;
        collecionListSelec.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            itemStepsList.innerHTML += `
                <li><input class="buttonStepsList" type="button" value="${doc.id}" data-id="${doc.id}"></li>
            `;
            collecionListSelec.innerHTML += `
                <option value="${doc.id}">${doc.id}</option>              
            `;
        });
        document.getElementById('defaultCLickRadio').click();
        let buttonStepsList = document.querySelectorAll('.buttonStepsList');
        // document.getElementById('defaultCLickRadio').checked = true;
            buttonStepsList.forEach(targetButton => {
                if(deleteCollection){targetButton.classList.add('deleteAlert')}
                else{targetButton.classList.remove('deleteAlert')}
                targetButton.addEventListener('click', (e) => {  
                    if(deleteCollection){
                        let forDelete = newDataUser.doc(userId).collection('stepsList').doc(e.target.dataset.id);
                            (forDelete);
                        deleteCollectionB();
                    }else{             
                        showDataSteps(e.target.dataset.id);
    
                        for(i = 0; i < buttonStepsList.length; i++){buttonStepsList[i].classList.remove('classActive')}
    
                        e.target.classList.add('classActive');
                        if(screen.width <= 850){
                            ShowAddNewCode('asideMenu')
                        }
                                             
                        ThisCollection.value = `${e.target.dataset.id}`; 
                        SelectCollectionActive.classList.remove('hide');              
                        thisCheck.click();  
                    }               
                });
            });
        });
}
const deleteCollectionB = () => {
    if(!deleteCollection){
        deleteCollection = true;
        showStepsList();
    }else{
        deleteCollection = false;
        showStepsList();
    }
} 
const deleteEachColletion = (forDelete) => {
    forDelete.collection('eachStepsList').get()
    .then((query) => {
        query.forEach((doc) => {
            l(doc.id);
            forDelete.collection('eachStepsList').doc(doc.id)
            .delete()
            .then(()=>{forDelete.delete()})
        })
    })
    // forDelete.delete();
}
let newUpdateData;
let contador;
const showDataSteps = (docId) => {

    let allDataHere = newDataUser.doc(userId).collection('stepsList').doc(docId).collection('eachStepsList');
    let allDataHereOrder = allDataHere.orderBy('date.newDate', 'asc');
    allDataHereOrder.onSnapshot((querySnapshot) => {
        dataFromDb.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            let datos = doc.data();

            let dateNew;
            let dateToday = moment(datos.date.newDate).format(format);
            let diffDays = moment().diff(dateToday, 'days');
            let diffMonths = moment().diff(dateToday, 'months');
            // diffDays <= 2  ? dateNew = diffDays + ' days ago'  : dateNew = dateToday;
            if(diffDays <= 30){
                diffDays === 0 ?  dateNew = 'Today' + ' at ' + datos.date.Datehour : dateNew = diffDays + ' days ago';                
            }
            else{
                if(diffMonths >= 1){
                    dateNew = diffMonths + ' months ago';                  
                }
                if(diffMonths >= 13){
                    dateNew = dateToday;
                }
            }
            
            allData = `   
            <div class="wrapperData">
                <header class="dataHeader">
                    <h4>${datos.newTitleNewItem}</h4>
                    <ul>
                        <li><i class="material-icons delete" data-id="${doc.id}">&#xe872;</i></li>
                        <li>
                            <i class="material-icons edit" 
                             data-new="${datos.newTitleNewItem}"
                             data-id="${doc.id}" 
                             data-code="${datos.newNewCode}" 
                             data-descr="${datos.newDescription}">
                             &#xe3c9;
                            </i>
                        </li>
                    </ul>
                </header>
                <div class="wrapperCode" > 
                    <button class="copy" onclick="copyData()">
                        <i class="material-icons">&#xe14d;</i>
                    </button>         
                    
                    <textarea class="code"  id="innerCode" rows="${datos.convertRows}">${datos.newNewCode}</textarea>
                    <p class="description">
                        ${datos.newDescription}
                    </p>
                </div>
                <div> 
                    <p class="details">
                        ${dateNew}           
                    </p>
                </div>
            </div>
            `;
            dataFromDb.innerHTML += allData ;
        });
        let deleteActiveCode = document.querySelectorAll('.delete');
        deleteActiveCode.forEach( activeCode => {
            activeCode.addEventListener('click', (e) => {
                l(e.target.dataset.id);
                allDataHere.doc(e.target.dataset.id).delete();
            });
        });
        let edit = document.querySelectorAll('.edit');
            edit.forEach( eachitem => {
                eachitem.addEventListener( 'click', e => {
                    newUpdateData = allDataHere.doc(e.target.dataset.id); 
                    updateTitleNewItem.value = e.target.dataset.new; 
                    updateCode.value = e.target.dataset.code; 
                    updateDescription.value = e.target.dataset.descr;
                    ShowAddNewCode('editSteps')
                });
            });
    });
}
let formUpdate = document.querySelector('#formUpdate');
let updateTitleNewItem = formUpdate['updateTitleNewItem'];
let updateCode = formUpdate['updateCode'];
let updateDescription = formUpdate['updateDescription'];

formUpdate.addEventListener( 'submit', e => {
    e.preventDefault();
    newTitleNewItem = updateTitleNewItem.value;
    newNewCode = updateCode.value;
    newDescription = updateDescription.value;
    let allUpdateData= {
        newTitleNewItem,
        newNewCode,
        newDescription, 
        date: {newDate, Datehour}, 
    }
    newUpdateData.update(allUpdateData)
    .then( ()=> {
        l('actualizado');
        formUpdate.reset(); 
        ShowAddNewCode('editSteps')   
    })
    .catch(e => {
        l(e);
        formUpdate.reset();  
        errorAll.innerHTML = 'Se ha presentado un error, intenta de nuevo por favor.';
        activeModal('modalError');
    });


});
const resetFormUpdate = () => {
    formUpdate.reset();    
}

// search
const searhTagsInDb = () => {
    l(tagSearch.value);
}
        


let inputSearch = document.querySelector('.inputSearch');
let tagSearch = document.querySelector('#inputSearch');
let divInputSearch = document.querySelector('.divInputSearch');

inputSearch.addEventListener('keydown', (e) => {
     if(e.keyCode === 13 && tagSearch.value){
         searhTagsInDb();
         tagSearch.value = '';
         searchTags();
     }
});
let inputSearchBole = true;
const searchTags = () => {
    if(!tagSearch.value){
        if(inputSearchBole){
            inputSearch.classList.add('openSearch');
            inputSearchBole = false;
        }
        else{
            inputSearch.classList.remove('openSearch');
            inputSearchBole = true;
        }
    }
    else{
        searhTagsInDb();
        tagSearch.value = '';
    }
    
}
