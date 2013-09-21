function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}

function getLinkParams(link) {
	var ret = {};
	link = str_replace("#", "", link);
	link = explode("?", link);
	ret["page"] = link[0];
	link = link[1];
	link = explode("&", link);
	for (var x in link) {
		tmp = explode("=", link[x]);
		ret[tmp[0]] = tmp[1];
	}
	return ret;
}

function showNews(id) {
	$.ajax({
		type : "POST",
		data : {
			nid : id
		},
		dataType : "json",
		url : "http://eboard.ir/khabardar/khabardar/reader.php",
		async : true,
		success : function(response) {
			var i = 0;
			renderTemplate("news", response.item, "category_content", '$.mobile.changePage("#category",{ transition: "slide"});');
			$.mobile.loading('hide');
		}
	});
}
