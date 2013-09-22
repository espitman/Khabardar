function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}

function renderTemplateAppend(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
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
			renderTemplate("category_news", data, "catPage-ul");
			$.mobile.loading('hide');
			iNav.push("home");
		}
	});
}

function updateCategory(cid, lastId) {
	$.mobile.loading('show');
	$.ajax({
		type : "POST",
		data : {
			cid : cid,
			lastId : lastId
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
			renderTemplateAppend("category_news", data, "catPage-ul");
			$.mobile.loading('hide');
			iNav.push("home");
			startAutoUpdate = 0;
			$.mobile.loading('hide');
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
			iNav.push('category', response.item.cid);
		}
	});
}

function autoUpdate() {
	
	//$(window).scroll(function() {
	$(window).bind('scrollstop', function () {
		
		//alert($(window).scrollTop()+','+$(document).height()+','+$(window).height());
		
		alert($("#category_content").height());
		
		if ($(window).scrollTop() > 10) {
			if ($(document).height() > $(window).height()) {
				if ($(window).scrollTop() == $(document).height() - $(window).height()) {
					if (startAutoUpdate == 0) {
						startAutoUpdate = 1;
						 var hash = document.location.hash;
						 if(hash == "#category") {
						 	var id = $("#catPage ul li:last").attr("data-id");
						 	var cid = $("#catPage ul li:last").attr("data-cid");
						 	updateCategory(cid, id);
						 }
					}
				}
			}
		}
	});

}
