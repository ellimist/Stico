$(function(){
	$("#attacker").on("change", function(){
		var doc=$("#victim")[0].contentWindow.document;
		doc.open();
		doc.write("test me!");
		doc.close();
	});
});