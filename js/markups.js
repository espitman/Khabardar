function getMarkup(name,callback) {
	var tpl = readTpl(name,callback);
	return tpl;
}

function readTpl(name,callback) {
	var tpl;
	$.ajax({
		type : "POST",
		url : "tmpl/"+ name + ".tpl",
		dataType : "text",
		async : false,
		success : function(data) {
			tpl = data;
			if(callback) {
				eval(callback);
				
			}
		},
		error : function(data) {
		}
	});
	return tpl;
}
