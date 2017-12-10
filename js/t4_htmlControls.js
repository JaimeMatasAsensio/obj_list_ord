"use strict";
/**
 * Controles de la pagina html
 */

//Id inputs
var capacityInp = document.getElementById("Capacity");
var nameInp = document.getElementById("Name");
var surnameInp = document.getElementById("Surname");
var indexAddInp = document.getElementById("indiceAdd");
var indexRemInp = document.getElementById("indiceRem");

//Id Buttons
var createBtn = document.getElementById("create");
var clearBtn = document.getElementById("clear");
var addBtn = document.getElementById("Add");
var firstIndexBtn = document.getElementById("fIndex");
var lastIndexBtn = document.getElementById("lIndex");
var firstElemBtn = document.getElementById("fElement");
var lastElemBtn = document.getElementById("lElement");
var addAtBtn = document.getElementById("addAt");
var removeBtn = document.getElementById("remove");
var removeElementBtn = document.getElementById("removeElement");

//Id outputs
var contentList = document.getElementById("contList");
var stringList = document.getElementById("stringList");
var outputList = document.getElementById("outputList");

//Iniciamos los controles de la pagina como0 disabled
nameInp.disabled = true;
surnameInp.disabled = true;
indexAddInp.disabled = true;
indexRemInp.disabled = true;


clearBtn.disabled = true;
addBtn.disabled = true;
firstElemBtn.disabled = true;
lastElemBtn.disabled = true;
lastIndexBtn.disabled = true;
firstIndexBtn.disabled = true;
addAtBtn.disabled = true;
removeBtn.disabled = true;
removeElementBtn.disabled = true;

contentList.innerHTML = "";
stringList.innerHTML = "";
outputList.innerHTML = "";

//
var objlist = {};

function START(cap){

  var num = parseInt(cap);
  objlist = new listPerson(cap);
  capacityInp.disabled = true;
  nameInp.disabled = false;
  surnameInp.disabled = false;
  indexAddInp.disabled = false;
  indexRemInp.disabled = false;

  createBtn.disabled = true;
  clearBtn.disabled = false;
  addBtn.disabled = false;
  firstElemBtn.disabled = false;
  lastElemBtn.disabled = false;
  lastIndexBtn.disabled = false;
  firstIndexBtn.disabled = false;
  addAtBtn.disabled = false;
  removeBtn.disabled = false;
  removeElementBtn.disabled = false;
  drawList();
  drawString();
  drawOutput("Lista Creada con exito!!! "+cap,"green");

}

function drawList(){
  if(objlist instanceof listPerson){
    var ite = objlist.items;
    var item = ite.next();
    var string = "";
    var i = 0;
    while(!item.done){
      string += "Item list no."+(i+1)+": ";
      if(item.value instanceof Person){
        string += item.value.FullName() + "<br>";
      }else{
        string += " empty element <br>"
      }
      item = ite.next();
      i++;
    }
    contList.innerHTML = string;
  }
}

function CreatePerson(name,surname){
  var name = name || "An Name";
  var surname = surname || "An surname";
  return new Person(name,surname);
}

function drawString(){
  stringList.innerHTML = objlist.toString();
}

function drawOutput(msg,color){
  var color = color || "black";
  outputList.style.color = color;
  outputList.innerHTML = msg;
}

function ADD(name,surname){
  var msg = ""
  var obj = CreatePerson(name,surname);
  try {
    msg = "New object added, current list size " + objlist.add(obj);
    drawList();
    drawString();
    drawOutput(msg,"green");
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
  } catch (e) {
    msg = e.name+" "+e.message;
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
    drawOutput(msg,"red");
  }
}

function FINDEX(name,surname){
  var msg = ""
  var obj = CreatePerson(name,surname);
  try{
    var index = objlist.IndexOf(obj);
    msg =(index != -1)? "First Index of " + obj.FullName() + " at " + index : "This object, "+ obj.FullName() +",isn`t into the list" ;
    var color = (index != -1)? "green" : "blue";
    drawOutput(msg,color);
  }catch (e){
    msg = e.name+" "+e.message;
    drawOutput(msg,"red");
  }
}

function LINDEX(name,surname){
  var msg = ""
  var obj = CreatePerson(name,surname);
  try{
    var index = objlist.LastIndexOf(obj);
    msg =(index != -1)? "Last Index of " + obj.FullName() + " at " + index : "This object, "+ obj.FullName() +",isn`t into the list" ;
    var color = (index != -1)? "green" : "blue";
    drawOutput(msg,color);
  }catch (e){
    msg = e.name+" "+e.message;
    drawOutput(msg,"red");
  }
}

function FELEMENT(){
  try {
    var aux = objlist.FirstElement();
    var msg = "First element of the list: "+aux.FullName();
    drawOutput(msg,"green");
  } catch (e) {
    msg = e.name+" "+e.message;
    drawOutput(msg,"red");
  }
}

function LELEMENT(){
  try {
    var aux = objlist.LastElement();
    var msg = "Last element of the list: "+aux.FullName();
    drawOutput(msg,"green");
  } catch (e) {
    msg = e.name+" "+e.message;
    drawOutput(msg,"red");
  }
}

function ADDAT(name,surname,index){
  var msg = "";
  var obj = CreatePerson(name,surname);
  var index = index || "An index";
  try {
    msg = "New object added at index " + index + ", current list size " + objlist.addAt(obj,index);
    drawList();
    drawString();
    drawOutput(msg,"green");
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
  } catch (e) {
    msg = e.name+" "+e.message;
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
    drawOutput(msg,"red");
  }
}

function REMOVE(index){
  try {
    var aux = objlist.remove(index);
    var msg = "Element removed from the list: "+aux.FullName();
    drawList();
    drawString();
    drawOutput(msg,"green");
    indexRemInp.value = "";
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
  } catch (e) {
    msg = e.name+" "+e.message;
    indexRemInp.value = "";
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
    drawOutput(msg,"red");
  }
}

function REMOVEELEMT(index,name,surname){
  var msg = "";
  var color = "";
  var obj = CreatePerson(name,surname);
  var index = index || "An index";
  try {
    var result = objlist.removeElement(index,obj);
    msg = (result)? "Success Remove Element form list" : "Fail Remove Element form list" ;
    color = (result)? "green" : "blue";
    drawList();
    drawString();
    drawOutput(msg,color);
    indexRemInp.value = "";
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
  } catch (e) {
    msg = e.name+" "+e.message;
    indexRemInp.value = "";
    nameInp.value = "";
    surnameInp.value = "";
    nameInp.focus();
    drawOutput(msg,"red");
  }
}

function CLEAR(){
  capacityInp.value = "";
  nameInp.value = "";
  surnameInp.value = "";
  indexAddInp.value = "";
  indexRemInp.value = "";

  nameInp.disabled = true;
  surnameInp.disabled = true;
  indexAddInp.disabled = true;
  indexRemInp.disabled = true;

  clearBtn.disabled = true;
  addBtn.disabled = true;
  firstElemBtn.disabled = true;
  lastElemBtn.disabled = true;
  lastIndexBtn.disabled = true;
  firstIndexBtn.disabled = true;
  addAtBtn.disabled = true;
  removeBtn.disabled = true;
  removeElementBtn.disabled = true;

  capacityInp.disabled = false;
  createBtn.disabled = false;

  contentList.innerHTML = "";
  stringList.innerHTML = "";
  outputList.innerHTML = "Lista eliminada!!";

  objlist = {};
}
