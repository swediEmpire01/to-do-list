
var CREATE;
var UPDATE;

setTimeout(function(){
    CREATE= document.getElementById("submit");
    UPDATE= document.getElementById("Update");
}, 1000)
let toDoList= {};
let index;
let listNames=[];
let newUpDate;
let listDisplay="";
let taskCountDisplay=""
let login=0;
let objectLength=0;
//the varient no. is the number of times the list have modified
let varient= Number(localStorage.getItem('varient'));
if(varient== null){
    varient=0;
}else{
varient= Number(varient);
    if(varient>=4){
        varient=0;
    }
}

// gets the object from storage
let created= Number(localStorage.getItem('created'));

//if empty its  recreates the object
if(created== null){
    created=0;
    toDoList={};
    login=0;
}
else{
    toDoList= localStorage.getItem("notes");
    toDoList= JSON.parse(toDoList);
    delete(toDoList);
    console.log(toDoList);
}
//displays the toDoLists after waiting for the browser to load
setTimeout(function(){display()}, 500);

// CREATE
function createNote(callback){
    if(login>0){
    listNames= Object.keys(toDoList);
    if(listNames.length>0){
    let position = listNames.length;
    created= Number(position);
    created++;
    }
    else{
        created=0
    }
    }else{
    login++;
    let position =1;
    created=0;
} 
    created++;
    let objectNote= "0"+ varient+ 'note';
    objectNote= objectNote+ created;
    let value= document.getElementById("tittle").value;
    if(value.length>0){
        toDoList[objectNote]= value ;
        saveValues();
        console.log(toDoList);
        display();
    }
    else{
        display();
    }
}

//RETRIEVE
function display(notes){
    if(type of toDoList != null){
    sortList(toDoList);
    index=0;
    listNames= Object.keys(toDoList);
    objectLength= listNames.length;

}else{objectLength= 0} 

    if(objectLength <1){
        document.getElementById("deleteDone").style.display= "none";
    }
    else{
        document.getElementById("deleteDone").style.display= "flex";
    }
    //iterate of the object code by geeksforgeeks.org
    for(let note in toDoList){
        //gets the propertyNames in the objects
        if(toDoList.hasOwnProperty(note)){
            note= toDoList[note];
            let list=listNames[index];
            list= list.slice(list.indexOf("n"));
            listDisplay+= ` <div class="note">
                                <div class="list">
                                    <div class="check">
                                        <Input type="checkbox" id="${index}" name="toDos" value="${listNames[index]}" class="check-box">
                                    </div>
                                    <div class="list-display">
                                       <label for="${index}">
                                            ${note}
                                        </label>
                                    </div>
                                    </Input>
                                </div>
                                <div class="edits">
                                    <button type="button" 
                                        onclick="editList('${list}')"
                                    class="edit"><img src="/assets/tabler--edit.svg" alt="edit-list-item-logo"></button>
                                </div>
                            </div>`;
            index++;
            
        }
    }
    //displays the number of task on
    taskCountDisplay="";
    let taskCount= listNames.length;
    taskCount= `<h2>${taskCount}</h2>`;
    if(typeof taskCount== null){
        taskCount=0
    } 
    taskCountDisplay= `<p>You have</p> ${taskCount}<p> task(s) to complete </p>`;
    document.getElementById("taskCount").innerHTML= taskCountDisplay;



    document.getElementById("disply").innerHTML= listDisplay;
    document.getElementsByName('tittle')[0].value= "";
    listDisplay="";
    saveValues();
}

//UPDATE
function editList(theOne){
    sortList(toDoList);
    theOne= "0" + varient+ theOne;
    CREATE.style.display= "none";
    UPDATE.style.display= "block";
    newUpDate= theOne;
    let valueDisplay= toDoList[theOne]
    delete toDoList[theOne];
    display(toDoList);
    document.getElementsByName('tittle')[0].value= valueDisplay;
    
}
function updateDone(){
    toDoList[newUpDate]= document.getElementById("tittle").value;
    CREATE.style.display= "block";
    UPDATE.style.display= "none"
    display(toDoList);

}

//DELETE
function done(print){
    let checked= document.getElementsByName('toDos');
    let results=[];
    let i=0;
    for(i= 0; i < checked.length; i++){
        created--;
        if(checked[i].checked){
            results.push(checked[i].value);
        }
    }
    //console.log(results);
    for(i=0; i< results.length; i++){
        delete toDoList[results[i]];
    }
    console.log(created);
    saveValues();
    clear();
    print(toDoList);
}

function saveValues(){
    listNames= Object.keys(toDoList);
    created= listNames.length;
    //stores the object & no. of list created
    localStorage.setItem('notes', JSON.stringify(toDoList));
    localStorage.setItem('created', created);
}

function clear() {
    document.getElementById("tittle").value= "";
}


//sortd the list
function sortList(list){
    varient++;
    index=0;
    let position=1;

    //gets the propertyNames in the objects
    listNames= Object.keys(list);
    for(let i=0; i< listNames.length;i++){
        //gets the value of a list item
        let value= list[listNames[index]];
        //deletes the list item
        delete list[listNames[index]];
        //creates a new sorted list item
        let objectNote= "0"+ varient+'note';
        objectNote= objectNote+ position;
        //saves new list item in the object
        list[objectNote]= value;
        position++;
        index++;
    }
    localStorage.setItem('varient', varient);
    saveValues();

}