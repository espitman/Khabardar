function getMarkup(name, callback) {
	var tpl = readTpl(name, callback);
	return tpl;
}

function readTpl(name, callback) {
	var v = 1;
	var tpl = localStorage.getItem('tpl_'+ v + name);
	if (tpl) {
		if (callback) {
			eval(callback);
		}
		return tpl;
	}

	$.ajax({
		type : "POST",
		url : "tmpl/" + name + ".tpl",
		dataType : "text",
		async : false,
		success : function(data) {
			tpl = data;
			localStorage.setItem('tpl_' + name, tpl);
			if (callback) {
				eval(callback);
			}
		},
		error : function(data) {
		}
	});
	return tpl;
}
