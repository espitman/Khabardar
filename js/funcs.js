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

function showCategory(cid) {
	$.ajax({
		type : "POST",
		data : {
			cid : cid
		},
		dataType : "json",
		url : "http://eboard.ir/khabardar/khabardar/reader.php",
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
			renderTemplate("category", data, "category_content", '$.mobile.changePage("#category",{ transition: "slide"});');
			$.mobile.loading('hide');
			iNav.push("home");
		}
	});
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
			renderTemplate("news", response.item, "news_content", '$.mobile.changePage("#news",{ transition: "slide"});');
			$.mobile.loading('hide');
			iNav.push('category',response.item.cid);
		}
	});
}
