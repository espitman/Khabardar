function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}


function getCategoryNews(cat,tid) {
	$.ajax({
		type : "POST",
		dataType : "jsonp",
		url : "http://api.khabarfarsi.net/api/news/latest/1?tid="+tid+"&output=json",
		async : true,
		success : function(response) {
			var data = {};
			data.slides = {};
			data.news = {};

			var i = 0;
			for (var x in response.items) {
				data.news[i] = response.items[x];
				i++;
			}
			renderTemplate("category", data, "category_content");
		}
	});
}

function getLinkParams(link) {
	var ret = {};
	link = str_replace("#","",link);
	link = explode("?",link);
	ret["page"] = link[0];
	link = link[1];
	link = explode("&",link);
	for(var x in link) {
		tmp = explode("=",link[x]);
		ret[tmp[0]] = tmp[1];
	}
	return ret;
}
