var events = require('events');

// type Editor extends Emitter
function Editor() {
    var mValue;
    events.EventEmitter.call(this);
    this.setValue = function(value) {
        mValue = value;
        this.emit('value-changed', value);
    };
    this.getValue = function() { return mValue; };
     
}
Editor.prototype.__proto__ = events.EventEmitter.prototype;

// type UIModel extends Emitter
function UIModel() {
    var mData;
    events.EventEmitter.call(this);
    this.setData = function(data) {
        mData = data;
        this.emit('changed', data);
    };
    this.getData = function() { return mData; }
} 
UIModel.prototype.__proto__ = events.EventEmitter.prototype;

function eq(ob1, ob2) {
    return JSON.stringify(ob1) == JSON.stringify(ob2);
}

var editor = new Editor();
var model = new UIModel();

// adding listeners
// this mimics a scenario. When value is changed FieldEditor(binding) we send it to UI model
// when UI model is changed we set the value to FieldEditor
editor.on('value-changed', function(data){
    console.log("Value changed event caught: "+JSON.stringify(data)); 
    if (eq(model.getData(), editor.getValue()) == false) {
        model.setData(data);
    }
});
model.on('changed', function(data) {
    console.log("Model changed event caught: "+JSON.stringify(data));
    if (eq(model.getData(), editor.getValue()) == false) {
        editor.setValue(data);
    }
});

// test space
editor.setValue(null);
editor.setValue(null);
editor.setValue(null);

console.log("... now setting value")
editor.setValue({"name" : "Pagla"});
editor.setValue({"name" : "Pagla"});
editor.setValue({"name" : "Pagla"});

console.log("... changing value from model")
model.setData({"name" : "Pagla Dashu"});
model.setData({"name" : "Pagla Dashu ..."})

console.log("... setting value again")
editor.setValue({"name" : "Bon manush"});

