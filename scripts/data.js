    let newDate = moment().format('lll');
    let code = `
        const task = () => {
            To do;
            return something;
        }
    `;

    let datos = {
        title: 'Fist item',
        code: code,
        date: newDate,
        description: 'Esta linea muestra un ejemplo de como funcionará el programa',
    }
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
    // data();
    const copyData = () => {
        let innerCode = document.querySelector('#innerCode');
        let copyDataCode = innerCode.value;
        console.log(copyDataCode)     
    }

