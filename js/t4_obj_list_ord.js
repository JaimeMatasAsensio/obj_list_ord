"use strict";
/**
 * Aplicacion de lista NO ordenada con objetos
 */

function CustomError(codeErr)
/*Constructor de mensajes de error con objetos. Requiere un codigo para designar el nombre y mensaje*/
{
  switch (codeErr) {
    case 0:
    this.name = "ErrorListIsFull: ";
    this.message = "List is Full.";
      break;

    case 1:
    this.name = "ErrorListIsEmpty: ";
    this.message = "List is Empty.";
      break;

    case 2:
    this.name = "ErrorNotAObjectPerson: ";
    this.message = "This Element is not a Object Person.";
      break;

    case 3:
    this.name = "ErrorElementNotExist: ";
    this.message = "This Element not exist in the list.";
      break;

    case 4:
    this.name = "ErrorElementAlready: ";
    this.message = "This Element already exists in the list.";
      break;

    case 5:
    this.name = "ErrorConstructorCalledFunction: ";
    this.message = "Constructor called how function.";
      break;

    case 6:
    this.name = "ErrorIndexOutOfList: ";
    this.message = "Index out of the list capacity";
    break;

    case 7:
    this.name = "ErrorIndexOutOfList: ";
    this.message = "Index out of the list capacity";
    break;

    default:
    this.name = "ErrorCode: ";
    this.message = "Not error code especified";

      break;
  }
}
CustomError.prototype = Object.create(new Error);




function Person(name,surname)
/*Constructor de objetos person */
{
  if(!(this instanceof Person)) throw new CustomError(5);
  var name = name || "a name";
  var surname = surname || "a Surname"
  Object.defineProperty(this, "name", {
    get: function () { return name},
    set: function(newName){ name = newName }
  });

  Object.defineProperty(this, "surname", {
    get: function () { return surname},
    set: function(newSurname){ surname = newSurname}
  });

  this.FullName = function(){
    return name + " " + surname;
  }
}
Person.prototype.constructor = Object.create(Person);



function listPerson(cap)
/*Constructor de objetos listPerson */
{
  if(!(this instanceof listPerson)) throw new CustomError(5);//Este if evita llamadas al constructor sin el operador new

  //----------------- "Propiedades" privadas
  var that = this;
  var content = [];
  var cap = parseInt(cap);
  var capacity = ((Number.isInteger(cap)) && (cap > 0))? cap : 5 ;
  var size = (function(){
    var i=0
    while(i < capacity && (content[i] instanceof Person)){
      i++;
    }
    return i;
  });

//----------------- Metodos Privados o de un uso

  (function (){
    for (var i = 0; i < capacity; i++) {
      content[i] = new Object;
    }
  })(); // Inicializa el Objeto listPerson

  function ord(){
    content.sort(function(a,b){
      if(!(a instanceof Person) && !(b instanceof Person)) return 0;
      if((a instanceof Person) && (b instanceof Person)){
        var surnameComp = a.surname.localeCompare(b.surname);
        if(surnameComp != 0){
          return surnameComp;
        }else{
          return a.name.localeCompare(b.name);
        }
      }
    });
  }

//----------------- Metodos publicos

  this.isEmpty = function ()
  /*Metodo publico para indicar si la lista esta vacia*/
  {
    if((content[0] instanceof Person)){
      return false;
    }else{
      return true;
    }
  }

  this.isFull = function()
  /*Metodopublico para indicar si la lista esta llena*/
  {
    if((content[capacity - 1] instanceof Person)){
      return true
    }else{
      return false;
    }
  }

  /*Metodo publico para obtener la capacidad de la lista*/
  Object.defineProperty(this,"capacity",{ get: function() { return capacity } } );

  /*Metodo publico para iterar los elementos de la lista con contenido*/
  Object.defineProperty(this, "items", {
    get: function(){
      var nextIndex = 0;
      return{
        next: function(){
          return nextIndex < capacity ? {value: content[nextIndex++], done:false}: {done: true};
        }
      }
    }
  });

  /*Metodo publico para mostrar el tamaño de la lista, numero de elementos*/
  Object.defineProperty(this,"size",{ get: function() {return size} });

  this.clear = function ()
  /*Metodo publico que limpia la lista de elementos*/
  {
    for (var i = 0; i < capacity; i++) {
      content[i] = new Object;
    }
  };

  this.add = function(obj)
  /*Metodo publico para añadir un objeto de tipo person, devuelve el tamaño actual de la lista*/
  {
    if(!(that.isFull()) && (obj instanceof Person)){
      var index = size();
      if(index < capacity){
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName());
        ord();
      }
      return size();
    }else{
      console.log("va a saltar el error!");
      if(that.isFull()) throw new CustomError(0);
      if(!(obj instanceof Person)) throw new CustomError(2);
    }
  };

  this.addAt = function(obj,index)
  /*Metodo publico para añadir un objeto de tipo person a la lista indicando la posicion, devuelve el tamaño actual de la lista*/
  {
    var added = -1;
    if(!(this.isFull()) && (obj instanceof Person) && index < capacity){
        var aux = content[index];
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName() +"at index "+index);
        content.sort(function(a,b){
          if(!(a instanceof Person) && (b instanceof Person)) return 1;
          if((a instanceof Person) && !(b instanceof Person)) return -1;
          if(!(a instanceof Person) && !(b instanceof Person)) return 0;
          if((a instanceof Person) && (b instanceof Person)) return 0;
        });
        added = size();
    }else{
      throw new CustomError(6);
    }
    return added;
  }

  this.get = function(index){
    if(index < capacity){
      return content[index];
    }else{
      throw new CustomError(6);
    }
  }

  this.toString = function(){
    var ite = this.items;
    var item = ite.next();
    var string = "";
    while(!item.done){
      if(item.value instanceof Person){
        string += item.value.FullName() + "; ";
      }else{
        string += "List element 'empty'; ";
      }
      item = ite.next();
    }
    return string;
  }

  this.IndexOf = function(obj){
    if((obj instanceof Person)){
      var i = 0;
      var index = -1;
      while (i < capacity && index == -1) {
        index = ((content[i].name === obj.name) && (content[i].surname === obj.surname))? i : -1 ;
        i++;
      }
      return index;
    }else{
      throw new CustomError(2);
    }
  }

  this.LastIndexOf = function(obj){
    if((obj instanceof Person)){
      var i = size() -1;
      var index = -1;
      while (i > 0 && index == -1) {
        index = ((content[i].name === obj.name) && (content[i].surname === obj.surname))? i : -1 ;
        i++;
      }
      return index;
    }else{
      throw new CustomError(2);
    }
  }

  this.FirstElement = function(){
    if((!that.isEmpty())){
      return content[0];
    }else{
      throw new CustomError(1);
    }
  }

  this.LastElement = function(){
    if(!(that.isEmpty())){
      return content[size()-1];
    }else{
      throw new CustomError(1);
    }
  }

  this.remove = function(index){
    if(index < capacity){
      var removed = content[index];
      content.splice(index,1,{});
      content.sort(function(a,b){
        if(!(a instanceof Person) && (b instanceof Person)) return 1;
        if((a instanceof Person) && !(b instanceof Person)) return -1;
        if(!(a instanceof Person) && !(b instanceof Person)) return 0;
        if((a instanceof Person) && (b instanceof Person)) return 0;
      });
      //console.log(that.toString());
      return removed;
    }else{
      throw new CustomError(6);
    }
  }

  this.removeElement = function(index, obj){
    if(index > capacity) throw new CustomError(6);
    if(!(obj instanceof Person)) throw new CustomError(2);
    var removed = false;
      if((content[index].name === obj.name) && (content[index].surname === obj.surname)){
        content[index] = {};
        removed = true;
        content.sort(function(a,b){
          if(!(a instanceof Person) && (b instanceof Person)) return 1;
          if((a instanceof Person) && !(b instanceof Person)) return -1;
          if(!(a instanceof Person) && !(b instanceof Person)) return 0;
          if((a instanceof Person) && (b instanceof Person)) return 0;
        });
        //console.log(that.toString());
      }
    return removed;
  }

}



function test(){
  console.log("---------- Testing person objects ----------");
  console.log("Create an object person...");
  var p1 = new Person();
  console.log("Assing values to the object...");
  p1.name = "Alicia";
  p1.surname = "Waters";
  console.log("View values of object...");
  console.log("Name: " + p1.name + ". Surname: " + p1.surname);
  console.log("Full name of person: " + p1.FullName());
  try {
    var p2err = Person();
  } catch (e) {
    console.log(e.name + "" + e.message);
  }
  console.log("---------- End testing person objects ----------");
  console.log("");
  console.log("");
  console.log("---------- Testing listPerson objects ----------");
  var p2 = new Person("Yolanda","Gomez");
  var p3 = new Person("Jaime","Matas");
  var p4 = new Person("Antonio","Roldan");
  var p5 = new Person("Valeria","Asensio");
  console.log("Compare 2 surnames...");
  console.log("p3 vs p5 Surnames..." + p3.surname.localeCompare(p5.surname))
  console.log("Create a new listPerson without capacity parametrer....")
  var lista = new listPerson();
  try {
    var listaErr = listPerson();
  } catch (e) {
    console.log(e.name + "" + e.message);
  }
  console.log("List capacity: " + lista.capacity);
  console.log("List size: " + lista.size());
  console.log("Adding an object person...");
  console.log("Current list size: " + lista.add(p1));
  console.log("Current list size: " + lista.add(p2));
  console.log("Adding an object person at index 1...")
  console.log("Current list size: " + lista.addAt(p3,1));
  console.log("Adding an object person at index 4...")
  console.log("Current list size: " + lista.addAt(p4,4));

  try {
    lista.get(300);
  } catch (e) {
    console.log("Try to get a element at index 300...");
    console.log(e.name + " " + e.message);
  }
  console.log(lista.toString());
  console.log("Index of object p2: " + lista.IndexOf(p2));
  try {
    lista.IndexOf("apache");
  } catch (e) {
    console.log("trying Search a index of non object person...");
    console.log(e.name + " " + e.message);
  }
  lista.add(p3);
  console.log("Last index of p3: " + lista.LastIndexOf(p3));
  var aux = lista.FirstElement();
  console.log("First Element of the list: " + aux.FullName());
  aux = lista.LastElement();
  console.log("Last Element of the list: " + aux.FullName());
  aux = lista.remove(4);
  console.log("Remove the element at index 4: " + aux.FullName());
  console.log("Success removing element at 2 object p2... " + lista.removeElement(2,p2));

  console.log("Current list content...");
  //Uso del iterador
  var ite = lista.items;
  var item = ite.next();
  while(!item.done){
    if(item.value instanceof Person){
      console.log("List element: "+item.value.FullName())
    }else{
      console.log("List element: empty ")
    }
    item = ite.next();
  }
  console.log("List capacity: " + lista.capacity);
  console.log("List size: " + lista.size());
  console.log("---------- End testing listPerson objects ----------");

}
//&test();
