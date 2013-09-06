$(function(){
	$('body').delegate('#attacker', 'keyup change', function(){
		runmd();
	});
});

function runmd(){
	//vars
	var output=null;
	var input=null;

	//get current input
	input=$("#attacker").val();
	output=input;

	//parse input
	output=markdown.toHTML(input);

	//publish to #preview
	var doc=$("#victim")[0].contentWindow.document;
	doc.open();
	doc.write(output);
	doc.close();
}