/* my globals */
var currentfile=null;

var gui = require('nw.gui');
var fs = require('fs');

var win=gui.Window.get();
var menubar=new gui.Menu({type: 'menubar'});
var file=new gui.Menu();
var actions = new gui.Menu();

var openItem=new gui.MenuItem({label: 'Open'});
var saveItem=new gui.MenuItem({label: 'Save'});
var saveAsItem=new gui.MenuItem({label: 'Save As'});
var newItem = new gui.MenuItem({label: 'New'});
var closeItem = new gui.MenuItem({label: 'Close'});
file.append(newItem);
file.append(openItem);
file.append(saveItem);
file.append(saveAsItem);
file.append(closeItem);


win.menu=menubar;
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file}), 1);

newItem.click=function(){
	newFile();
};
openItem.click=function(){
	openFile();
};
saveAsItem.click=function(){
	saveFileAs();
};
saveItem.click=function(){
	saveFile();
};
closeItem.click = function(){
	close();
};

function newFile(){
	$("#attacker").val("").trigger("change");
	currentfile = null;
}

function openFile() {
    var chooser = $("#opendlg");
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
 };

 function saveFile(){
 	if(currentfile!=null)
	writeFile(currentfile, $("#attacker").val());
	else saveFileAs();
}
function saveFileAs(){
	var chooser = $("#savedlg");
    chooser.change(function(evt) {
    	var fileName=$(this).val();
		writeFile(fileName, $("#attacker").val());
		currentfile=fileName;
    });
    chooser.trigger('click');  
}

function close(){
	win.close();
}

function writeFile(path, content){
	fs.writeFile(path, content, function(err) {
		if(err) {
			alert("Error writing file!");
		}
	});
}