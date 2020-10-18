  
  let db = firebase.firestore();
//   let newDataUser= db.collection('Steps').doc('UserSteps');
  let newDataUser= db.collection('Steps');
  let newcollecionList, newTitleNewItem, newNewCode, newDescription;
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
            newcollecionList = collecionList.value;
        }
        newTitleNewItem = titleNewItem.value;
        newNewCode = newCode.value;
        newDescription = description.value;

        return addnewData(newcollecionList, newTitleNewItem, newNewCode, newDescription, allTags);
    }
    const addnewData = (newcollecionList, newTitleNewItem, newNewCode, newDescription, allTags) => {
        if(userId){
            newDataUser.doc(userId).collection(newcollecionList).doc(newTitleNewItem).set({
                newTitleNewItem,
                newNewCode,
                newDescription,
                allTags, 
                date: newDate,
            })
            .then(() => {    
                newItemCode.reset();
                ShowAddNewCode('newDataModal');
                l('Registrado')
            })
            .catch( error => {       
                l(error);
            });            
            allTags = [];
            insertTags.innerHTML =  ``;
        }else{
            errorAll.innerHTML = 'Debes inciar sesión o crear una cuenta para poder guardar los cambios';
            activeModal('modalError');
        }


    }
    let newItemCode = document.querySelector('#newItemCode'); 
    let collecionList = newItemCode['collecionList'];
    let addCollection = newItemCode['addCollection'];
    let titleNewItem = newItemCode['titleNewItem'];
    let newCode = newItemCode['code'];
    let description = newItemCode['description'];
    let allTags= [];

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




  