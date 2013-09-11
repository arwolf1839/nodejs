var events = require('events');

// type Editor extends Emitter
function Editor() {
    events.EventEmitter.call(this);
    this.setValue = function(value) {
        this.emit('value-changed', value);
    };
}
Editor.prototype.__proto__ = events.EventEmitter.prototype;

// type UIModel extends Emitter
function UIModel() {
    events.EventEmitter.call(this);
    this.setData = function(data) {
        this.emit('changed', data);
    };
} 
UIModel.prototype.__proto__ = events.EventEmitter.prototype;


var editor = new Editor();
var model = new UIModel();

// adding listeners
// this mimics a scenario. When value is changed FieldEditor(binding) we send it to UI model
// when UI model is changed we set the value to FieldEditor
editor.on('value-changed', function(data){
    console.log("Value changed event caught: "+data);   
    model.setData(data);
});
model.on('changed', function(data) {
    console.log("Model changed event caught: "+data);
    editor.setValue(data);
});

// test space
editor.setValue("hola editor");
