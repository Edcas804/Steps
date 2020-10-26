  
  let db = firebase.firestore();
  let newDataUser= db.collection('Steps');

  let newcollecionList, newTitleNewItem, newNewCode, newDescription;   
  let newItemCode = document.querySelector('#newItemCode'); 
  let collecionListSelec = newItemCode['collecionListSelec'];
  let addCollection = newItemCode['addCollection'];
  let titleNewItem = newItemCode['titleNewItem'];
  let newCode = newItemCode['code'];
  let description = newItemCode['description'];
  let allTags= [];
  const updatecollectionList = (e) => {
      if(e.target.value === 'Add new Collection'){
          document.querySelector('#showContentSelectNew').classList.remove('hide');
          document.querySelector('#showContentSelectList').classList.add('hide');
      }
      else{
        document.querySelector('#showContentSelectList').classList.remove('hide');
        document.querySelector('#showContentSelectNew').classList.add('hide');
      }
  }
const writeCode = (e) => {
    e.preventDefault();
    if(addCollection.value){
        newcollecionList = addCollection.value;
    }else{
        newcollecionList = collecionListSelec.value;
    }
    newTitleNewItem = titleNewItem.value;
    newNewCode = newCode.value;
    newDescription = description.value;
    let AllData = {
        newTitleNewItem,
        newNewCode,
        newDescription,
        allTags,
        date: newDate,
    };
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
let dataFromDb = document.querySelector('#dataFromDb');
let allData;
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
        let buttonStepsList = document.querySelectorAll('.buttonStepsList');
            buttonStepsList.forEach(targetButton => {
                targetButton.addEventListener('click', async(e) => {                  
                    await showDataSteps(e.target.dataset.id);    
                    document.querySelector('#stepsDbTittle').innerHTML = e.target.dataset.id;                
                });
            });
        });
}
const showDataSteps = (docId) => {
    newDataUser.doc(userId).collection('stepsList').doc(docId).collection('eachStepsList')
    .onSnapshot((querySnapshot) => {
        dataFromDb.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            let datos = doc.data();
            
            allData = `   
            <div class="wrapperData">
                <header class="dataHeader">
                    <h4>${datos.newTitleNewItem}</h4>
                    <ul>
                        <li><i class="material-icons delete" data-id="${doc.id}">&#xe872;</i></li>
                        <li><i class="material-icons edit">&#xe3c9;</i></li>
                    </ul>
                </header>
                <div class="wrapperCode" > 
                    <button class="copy" onclick="copyData()">
                        <i class="material-icons">&#xe14d;</i>
                    </button>         
                    
                    <textarea class="code"  id="innerCode">${datos.newNewCode}</textarea>
                    <p class="description">
                        ${datos.newDescription}
                    </p>
                </div>
                <div> 
                    <p class="details">
                    Actualizado el  ${datos.date}           
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
                newDataUser.doc(userId).collection('stepsList').doc(docId).collection('eachStepsList').doc(e.target.dataset.id).delete()
            });
        });
    });
}