/* my globals */
var currentfile=null;

var gui = require('nw.gui');
var fs = require('fs');

var Menu = new gui.Menu({
    type:   'menubar'
});
var FileMenu = new gui.Menu();
var openItem=new gui.MenuItem({label: 'Open'});
var saveItem=new gui.MenuItem({label: 'Save'});
var saveAsItem=new gui.MenuItem({label: 'Save As'});
FileMenu.append(openItem);
FileMenu.append(saveItem);
FileMenu.append(saveAsItem);
Menu.append(
    new gui.MenuItem({
        label: 'File',
        submenu: FileMenu
    })
);
gui.Window.get().menu = Menu;

openItem.click=function(){
  	openFile('#opendlg');
}
saveAsItem.click=function(){
	saveFileAs("#savedlg");
}
saveItem.click=function(){
	saveFile();
}

function openFile(name) {
    var chooser = $(name);
    chooser.change(function(evt) {
    	var fileName=$(this).val();
		fs.exists(fileName, function(exists) {
		if (exists) {
		fs.stat(fileName, function(error, stats) {
		  fs.open(fileName, "r", function(error, fd) {
		    var buffer = new Buffer(stats.size);

		    fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
		      var data = buffer.toString("utf8", 0, buffer.length);
		      $("#attacker").val(data).trigger("change");
		      currentfile=fileName;
		      fs.close(fd);
		    });
		  });
		});
		}
		});
    });
    chooser.trigger('click');  
 }

 function saveFile(){
	writeFile(currentfile, $("#attacker").val());
}
function saveFileAs(name){
	var chooser = $(name);
    chooser.change(function(evt) {
    	var fileName=$(this).val();
		writeFile(fileName, $("#attacker").val());
		currentfile=fileName;
    });
    chooser.trigger('click');  
}
function writeFile(path, content){
	fs.writeFile(path, content, function(err) {
	    if(err) {
	        alert("Error writing file!");
	    }
	});
}